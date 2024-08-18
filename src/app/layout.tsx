import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "zacbowls",
  description: "bowling is fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col items-center",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center max-w-5xl w-full px-4 min-h-dvh">
            <nav className="flex justify-between justify w-full items-center">
              <p className="">zac bowls</p>
              <ThemeToggle />
            </nav>
            <div className="flex-1 w-full">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
