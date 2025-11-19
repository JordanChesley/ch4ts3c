import type { Metadata } from "next";
import { Geist, Geist_Mono, Kreon } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const alamanca = localFont({
  src: [
    {path: '../../public/AlamancaDemo-Wp8Mn.ttf', weight: '400', style: 'normal'}
  ]
})

const byteBounce = localFont({
  src: [
    {path: '../../public/ByteBounce.ttf', weight: '400', style: 'normal'}
  ]
})

const catgirlSystem = localFont({
  src: [
    {path: '../../public/CatgirlSystemFont-Regular.otf', weight: '400', style: 'normal'}
  ]
})

const cryptoCrash = localFont({
  src: [
    {path: '../../public/CryptoCrash-K7jWe.ttf', weight: '400', style: 'normal'},
    {path: '../../public/CryptoCrashItalic-vmogL.ttf', weight: '400', style: 'italic'},
  ]
})

const cyberCipher = localFont({
  src: [
    {path: '../../public/CyberCipher-Zp5Rm.ttf', weight: '400', style: 'normal'},
  ]
})

const merkur = localFont({
  src: [
    {path: '../../public/Merkur-j147.otf', weight: '400', style: 'normal'}
  ]
})

const rovelink = localFont({
  src: [
    {path: '../../public/Rovelink-YqwpL.otf', weight: '400', style: 'normal'}
  ]
})

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
