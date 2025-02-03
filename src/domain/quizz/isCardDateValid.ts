import type { Card } from "../cards/Card";

export function isCardDateValid(card: Card) {
  return card.lastUpdateDate <= new Date();
}
