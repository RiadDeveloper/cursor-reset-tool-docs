import "@/app/globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cursor Reset Tool Documentation | Reset Machine Identifiers",
  description:
    "Official documentation for the Cursor Reset Tool. Reset Cursor IDE machine identifiers easily without running external applications. Windows only.",
  keywords:
    "Cursor IDE, machine ID reset, Windows tool, PowerShell script, Cursor registration",
  authors: [{ name: "Riad developer" }],
  creator: "Riad developer",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Cursor Reset Tool Documentation",
    description:
      "Reset Cursor IDE machine identifiers easily without running external applications",
    type: "website",
    siteName: "Cursor Reset Tool Documentation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
