import type { Card } from "./Card";
import type { CardUserData } from "./CardUserData";

export interface ManageCard {
  createCard(cardContent: CardUserData): Card;
}
