import { institutionalContact, socialLinks } from "@/content/contact";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo";

export function OrganizationJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: institutionalContact.name || siteName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/ccep-logo-horizontal.png"),
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: institutionalContact.address,
      addressLocality: "Puebla",
      addressCountry: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: institutionalContact.phone,
      email: institutionalContact.email,
      contactType: "organization",
      availableLanguage: "es",
    },
    sameAs: socialLinks.map((social) => social.href),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />;
}
