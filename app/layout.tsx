import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // Poppins has no variable build on Google Fonts, so the weights used on the page are
  // requested explicitly. 800 carries the headlines, 600 and 650 the labels and buttons.
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relay — Same models. Lower API price.",
  description: "Keep the AI stack you already use. Relay changes the economics underneath it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}