import { redirect } from "next/navigation";

/**
 * Compatibility route for older Google Ads sitelinks and bookmarks.
 * The donation page moved to /donacion; keep the former URL operational
 * so existing campaign resources do not land on a 404.
 */
export default function LegacyDonationPage() {
  redirect("/donacion");
}
