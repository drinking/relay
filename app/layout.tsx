import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "一起签署电动自行车用车安全承诺书，守护平安家园",
  description: "一起签署电动自行车用车安全承诺书，守护平安家园",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <div id='wx_pic' style={{ margin: '0 auto;', display: 'none' }}>
          <img src='/static/share.jpg' />
        </div>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
