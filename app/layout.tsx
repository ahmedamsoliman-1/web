import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./enhance.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://web.aamsdn.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ahmed Soliman — AI Platform Engineer", template: "%s | Ahmed Soliman" },
  description: "Senior Software Developer and AI Platform Engineer in Abu Dhabi building reliable voice AI, backend systems, and cloud-native platforms.",
  keywords: ["Ahmed Soliman", "AI Platform Engineer", "Senior Software Developer", "Backend Engineer", "Voice AI", "Cloud Engineer", "Abu Dhabi", "UAE"],
  authors: [{ name: "Ahmed Soliman" }],
  creator: "Ahmed Soliman",
  icons: {
    icon: [{ url: "/ico.jpeg", type: "image/jpeg" }],
    shortcut: "/ico.jpeg",
    apple: "/ico.jpeg",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_AE",
    url: "/",
    title: "Ahmed Soliman — AI Platform Engineer",
    description: "Building dependable AI platforms, backend systems, and cloud-native infrastructure.",
    siteName: "Ahmed Soliman",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ahmed Soliman — AI Platform Engineer" }],
  },
  twitter: { card: "summary_large_image", title: "Ahmed Soliman — AI Platform Engineer", description: "Building dependable AI platforms, backend systems, and cloud-native infrastructure.", images: ["/og-image.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#070b14", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
