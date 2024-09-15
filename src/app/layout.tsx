import { ThemeProvider } from "@/app/providers/ThemeProvider";
import SignedIn from "@/components/SignedIn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
    <html
      lang="en"
      suppressHydrationWarning={true} // i would rather fix the issue, but no fucking clue why this is happening
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col items-center",
          fontSans.variable
        )}
      >
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center max-w-5xl w-full px-4 pb-4 min-h-dvh">
            <nav className="flex justify-between justify w-full items-center">
              <Link href={"/"} className="">
                zac bowls
              </Link>
              <div className="flex gap-6 items-center justify-center">
                <SignedIn />
                <ThemeToggle />
              </div>
            </nav>
            <div className="flex-1 w-full">{children}</div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
