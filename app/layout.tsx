import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo",
  description: "Generated by create next app",
};

function TopBar() {
  return (
    <div className="bg-black text-white p-5 text-5xl font-bold text-center">
      Todo List
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
