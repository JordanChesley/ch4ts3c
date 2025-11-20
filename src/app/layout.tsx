import type { Metadata } from "next";
import "./globals.css";
import { cryptoCrash } from "@/lib/Fonts";

export const metadata: Metadata = {
  title: "CH4TS3C",
  description: "The FITSEC Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cryptoCrash.className} ${cryptoCrash.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
