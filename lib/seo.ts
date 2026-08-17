import type { Metadata } from "next";

export const SITE = {
  name: "Anhaus",
  url: "https://anhaus.vn",
  // Ảnh chia sẻ mặc định: Indochine · phòng khách · mức Cao
  ogImage: "/images/indochine/09_Phong-khach_Muc-cao.webp",
  ogImageAlt: "Phòng khách phong cách Indochine — mức Cao",
  ogImageWidth: 2000,
  ogImageHeight: 1125,
  locale: "vi_VN",
  email: "info@anhaus.vn",
} as const;

type PageMetaInput = {
  /** Tiêu đề đầy đủ (đã gồm thương hiệu) — dùng absolute, bỏ qua template. */
  title: string;
  description: string;
  /** Đường dẫn có trailing slash, vd "/phong-cach/". Trang chủ là "/". */
  path: string;
};

export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: path,
      title,
      description,
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
      title,
      description,
      images: [SITE.ogImage],
    },
  };
}

/** LocalBusiness (studio thiết kế & thi công nội thất) — nhúng toàn site. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: "Studio thiết kế và thi công nội thất trọn gói.",
    url: SITE.url,
    email: SITE.email,
    telephone: "+84357576270",
    image: `${SITE.url}${SITE.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "280E4 Lương Định Của",
      addressLocality: "Phường Bình Trưng",
      addressRegion: "TP.HCM",
      addressCountry: "VN",
    },
    areaServed: [
      { "@type": "City", name: "TP.HCM" },
      { "@type": "City", name: "Bình Dương" },
      { "@type": "City", name: "Vũng Tàu" },
    ],
  };
}

/** Organization + logo — chỉ nhúng ở trang chủ. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    email: SITE.email,
  };
}
