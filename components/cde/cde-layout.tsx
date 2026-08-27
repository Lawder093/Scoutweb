import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { CDEData } from "@/content/cdes/types";
import { BackToHomeButton } from "./back-to-home-button";
import { CDEHero } from "./cde-hero";
import { CDENavigation } from "./cde-navigation";
import { NosotrosSection } from "./nosotros-section";
import { CommunitiesSection } from "./communities-section";
import { EducatorsSection } from "./educators-section";
import { ActivitiesSection } from "./activities-section";
import { GallerySection } from "./gallery-section";
import { CommunityFeedPreview } from "./community-feed-preview";
import { getCDEActivities } from "@/lib/content/services";

export async function CDELayout({ cde }: { cde: CDEData }) {
  const activities = await getCDEActivities(cde.slug, cde.activities, cde.heroImage);

  return <><SiteHeader /><main className="min-h-screen bg-paper"><div className="section-shell pb-5 pt-28"><BackToHomeButton /></div><CDEHero cde={cde} /><CDENavigation /><NosotrosSection cde={cde} /><CommunitiesSection cde={cde} /><EducatorsSection cde={cde} /><ActivitiesSection cde={cde} activities={activities} /><GallerySection cde={cde} /><CommunityFeedPreview /></main><SiteFooter /></>;
}
