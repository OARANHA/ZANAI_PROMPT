import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
<<<<<<< HEAD
=======
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
>>>>>>> ca4fc008d6219a6ce8c7cdfdcfed11128590981b

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Z.ai Code Scaffold - AI-Powered Development",
  description: "Modern Next.js scaffold optimized for AI-powered development with Z.ai. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "Z.ai Team" }],
  openGraph: {
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
=======
  title: "urbanDev - Soluções em IA e Desenvolvimento Web",
  description: "Transformação digital com inteligência artificial e websites institucionais modernos",
  keywords: ["urbanDev", "IA", "Inteligência Artificial", "Desenvolvimento Web", "Next.js", "TypeScript", "Agentes de IA"],
  authors: [{ name: "urbanDev Team" }],
  openGraph: {
    title: "urbanDev - Soluções em IA e Desenvolvimento Web",
    description: "Transformação digital com inteligência artificial e websites institucionais modernos",
    url: "https://urbandev.com",
    siteName: "urbanDev",
>>>>>>> ca4fc008d6219a6ce8c7cdfdcfed11128590981b
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
<<<<<<< HEAD
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
=======
    title: "urbanDev - Soluções em IA e Desenvolvimento Web",
    description: "Transformação digital com inteligência artificial e websites institucionais modernos",
>>>>>>> ca4fc008d6219a6ce8c7cdfdcfed11128590981b
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
=======
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
>>>>>>> ca4fc008d6219a6ce8c7cdfdcfed11128590981b
        <Toaster />
      </body>
    </html>
  );
}
