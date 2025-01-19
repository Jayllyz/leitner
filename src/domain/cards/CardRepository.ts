import type { Card } from "./Card";
import type { CardUserData } from "./CardUserData";

export interface CardRepository {
  createCard(cardContent: CardUserData): Card;
}
