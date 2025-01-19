import type { Card } from "./Card";
import type { CardUserData } from "./CardParameter";

export interface CardRepository {
  createCard(cardContent: CardUserData): Card;
}
