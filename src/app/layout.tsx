import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Vaibhav — AI & ML Engineer",
  description: "AI & Machine Learning Engineer building intelligent systems that solve real-world problems.",
  keywords: ["AI Engineer", "Machine Learning", "GenAI", "LLM", "Portfolio"],
  openGraph: {
    title: "Vaibhav — AI & ML Engineer",
    description: "Building intelligent systems that solve real-world problems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
