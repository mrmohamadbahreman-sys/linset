import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ConsultWidget from "./components/ConsultWidget";
import CyberBackground from "./components/CyberBackground";

export const metadata: Metadata = {
  title: "Linset | شرکت برنامه نویسی",
  description: "شرکت برنامه نویسی حرفه‌ای",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-main text-main antialiased flex flex-col min-h-screen relative">
        <CyberBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="grow">
            {children}
          </main>
          <Footer />
          <ConsultWidget />
        </div>
      </body>
    </html>
  );
}