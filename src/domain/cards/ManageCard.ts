import type { Card } from "./Card";
import type { CardContent } from "./CardParameter";

export interface ManageCard {
  createCard(cardContent: CardContent): Card;
}
