import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { success } = rateLimit(`newsletter:${ip}`, 3, 60_000);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { email, firstName, source } = result.data;

    // Check if already subscribed
    const existing = await db.subscriber.findUnique({ where: { email } });

    if (existing?.status === "CONFIRMED") {
      return NextResponse.json(
        { message: "You're already subscribed! Check your inbox for past issues." },
        { status: 200 }
      );
    }

    // Generate confirmation token
    const confirmToken = randomBytes(32).toString("hex");

    if (existing) {
      // Resend confirmation
      await db.subscriber.update({
        where: { email },
        data: { confirmToken, status: "PENDING", updatedAt: new Date() },
      });
    } else {
      // Create new subscriber
      await db.subscriber.create({
        data: {
          email,
          firstName,
          source: source ?? "unknown",
          confirmToken,
          ipAddress: ip,
          status: "PENDING",
        },
      });
    }

    // TODO: Send confirmation email via Resend
    // await sendConfirmationEmail(email, firstName, confirmToken);

    return NextResponse.json(
      {
        message: "Check your inbox — we've sent a confirmation email. Click the link to complete your subscription.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
