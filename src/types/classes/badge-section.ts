import { Badge, RunContext } from "../index.js";

export class BadgeSection {
  badges: Array<Badge>;
  constructor(run: RunContext) {
    const badges = run.badges.map(
      (badge) => new Badge(badge, run.settings, run.about, run.providers)
    );
    this.badges = badges;
  }
}
