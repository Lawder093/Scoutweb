import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { CDEData } from "@/content/cdes/types";
import { BackToHomeButton } from "./back-to-home-button";
import { CDEHero } from "./cde-hero";
import { CDENavigation } from "./cde-navigation";
import { CommunitySection } from "./community-section";
import { EducatorsSection } from "./educators-section";
import { ProjectsSection } from "./projects-section";
import { GallerySection } from "./gallery-section";
import { CommunityFeedPreview } from "./community-feed-preview";

export function CDELayout({ cde }: { cde: CDEData }) {
  return <><SiteHeader /><main className="min-h-screen bg-paper"><div className="section-shell pb-5 pt-28"><BackToHomeButton /></div><CDEHero cde={cde} /><CDENavigation /><CommunitySection cde={cde} /><EducatorsSection cde={cde} /><ProjectsSection cde={cde} /><GallerySection cde={cde} /><CommunityFeedPreview cde={cde} /></main><SiteFooter /></>;
}
