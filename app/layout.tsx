import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Archivo Black has a bold, blocky retro feel similar to Bauhaus 93
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Robert Ross Harburda | Audio Engineer & Producer",
  description:
    "Portfolio of Robert Ross Harburda - Audio Engineering, Senior Presentation, Engineer, Artist & Producer",
};

export const viewport: Viewport = {
  themeColor: "#F5F5F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${archivoBlack.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
