"use client";

import type { AnchorHTMLAttributes, MouseEventHandler } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  eventName: string;
  eventParams?: AnalyticsParams;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function TrackedLink({ eventName, eventParams, onClick, children, ...props }: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) trackEvent(eventName, eventParams);
  };

  return <a {...props} onClick={handleClick}>{children}</a>;
}
