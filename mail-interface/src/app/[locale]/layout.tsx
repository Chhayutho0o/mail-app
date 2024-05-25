import "./globals.css";
import ProgressBarProvider from "@/components/providers/progress-bar-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export const metadata = {
  title: {
    default: "Dashboard",
    template: `%s | Dashboard`,
  },
  description: "Dashboard",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [{ name: "cheii" }],
  creator: "cheii",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  let messages;
  try {
    messages = (await import(`../../locales/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProgressBarProvider>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ProgressBarProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
