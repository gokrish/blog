import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { success } = rateLimit(`contact:${ip}`, 3, 300_000); // 3/5min

    if (!success) {
      return NextResponse.json(
        { error: "Too many messages. Please wait before sending again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    // Honeypot check
    if (result.data.honeypot) {
      // Silent success for bots
      return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
    }

    await db.contactMessage.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
        ipAddress: ip,
      },
    });

    // TODO: Send notification email via Resend
    // await sendContactNotification(result.data);

    return NextResponse.json(
      { message: "Message received! I'll get back to you within 48 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
