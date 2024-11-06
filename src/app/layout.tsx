import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/utils/QueryProvider";

export const metadata: Metadata = {
  title: "Dashboard - SoTrue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className="bg-[#1C2545]">
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
