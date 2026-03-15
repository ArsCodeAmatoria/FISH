import type { Metadata } from "next";
import { Cinzel, Courier_Prime, Lilita_One } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinematic",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const courierPrime = Courier_Prime({
  variable: "--font-screenplay",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "FISH — Cinematic Screenplay",
  description: "A visual screenplay and film world explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lilitaOne.variable} ${cinzel.variable} ${courierPrime.variable}`}
    >
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
