import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nail Salon Website Concepts",
  description: "Three distinct, client-ready website directions for a modern nail salon.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
