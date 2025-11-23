import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair-display" // Next.js creates this var
});

const lora = Lora({ 
  subsets: ["latin"],
  variable: "--font-lora" 
});

export const metadata: Metadata = {
  title: "Editorial Blog",
  description: "A simple blog assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}