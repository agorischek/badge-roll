"use strict";

import { Badge } from "./declarations";

export function buildPath(badge: Badge): string {
  const path = `${badge.basePath}/${badge.id}/${badge.spec}`;
  return path;
}
