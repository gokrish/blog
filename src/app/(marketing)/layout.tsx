export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="main-content" className="flex-1 flex flex-col">{children}</main>;
}
