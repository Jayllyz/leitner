import type { Card } from "./Card";
import type { CardUserData } from "./CardUserData";

export interface ManageCard {
  getAllCards(): Card[];
  createCard(cardContent: CardUserData): Card;
}
