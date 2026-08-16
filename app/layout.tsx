import type { Metadata, Viewport } from "next";
import { Archivo, Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE, localBusinessJsonLd } from "@/lib/seo";

// Headings / wordmark
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// Body copy
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Numbers / data
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Anhaus — Thiết kế & thi công nội thất",
    template: "%s · Anhaus",
  },
  description: "Anhaus — studio thiết kế và thi công nội thất tại TP.HCM.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: "Anhaus — Thiết kế & thi công nội thất",
    description: "Anhaus — studio thiết kế và thi công nội thất tại TP.HCM.",
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: SITE.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anhaus — Thiết kế & thi công nội thất",
    description: "Anhaus — studio thiết kế và thi công nội thất tại TP.HCM.",
    images: [SITE.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#232B33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${archivo.variable} ${beVietnamPro.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        {/* JSON-LD LocalBusiness — toàn site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
