import type { Card } from "./Card";
import type { CardUserData } from "./CardUserData";

export interface ManageCard {
  getAllCards(tags?: string[]): Card[];
  createCard(cardContent: CardUserData): Card;
}
