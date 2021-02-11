"use strict";

export interface Badge {
  id: string;
  spec?: string;
  title: string;
  alt?: string;
  vars?: Array<string>;
  style?: string;
  basePath: string;
}

export function buildPath(badge: Badge): string {
  const path = `${badge.basePath}/${badge.id}/${badge.spec}`;
  return path;
}
