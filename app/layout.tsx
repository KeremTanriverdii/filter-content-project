import type { Metadata } from "next";
import "./globals.css"
import BackToTop from "./components/BackToTop";

export const metadata: Metadata = {
  title: "Filtered Content Project",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <body
        className={`antialiased`}
      >

        {children}
        <BackToTop />
      </body>
    </html>
  );
}
