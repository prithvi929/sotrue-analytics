import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/utils/Providers";

export const metadata: Metadata = {
  title: "Dashboard - SoTrue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body suppressHydrationWarning={true} className="bg-[#1C2545]">
          {children}
        </body>
      </Providers>
    </html>
  );
}
