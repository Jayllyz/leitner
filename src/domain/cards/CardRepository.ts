import type { Card } from "./Card";
import type { CardContent } from "./CardParameter";

export interface CardRepository {
  createCard(cardContent: CardContent): Card;
}
