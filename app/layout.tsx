import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Montserrat } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
// });
// const roboto_mono = Roboto_Mono({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });
const monsterrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
// const noto_sans_devanagari = Noto_Sans_Devanagari({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Made By Hemant Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={monsterrat.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
