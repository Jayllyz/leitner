import type { Card } from "./Card";
import type { CardUserData } from "./CardParameter";

export interface ManageCard {
  createCard(cardContent: CardUserData): Card;
}
