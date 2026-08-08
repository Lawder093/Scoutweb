import { argentina } from "./argentina";
import { colombia } from "./colombia";
import { mexico } from "./mexico";
import type { CDEData } from "./types";

export const cdes = {
  mexico,
  colombia,
  argentina,
} as const satisfies Record<string, CDEData>;

export type CDESlug = keyof typeof cdes;

export function getCDE(slug: string): CDEData | undefined {
  return cdes[slug as CDESlug];
}
