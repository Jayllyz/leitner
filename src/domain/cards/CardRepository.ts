import type { Card } from "./Card";
import type { CardCategory } from "./CardCategory";
import type { CardUserData } from "./CardUserData";

export interface CardRepository {
  getAllCards(): Card[];
  getCardById(id: string): Card;
  createCard(cardContent: CardUserData, cardCategory: CardCategory): Card;
}
