import type { CardCategory } from "./CardCategory";
import type { CardUserData } from "./CardUserData";

export class Card {
  id: string;
  cardContent: CardUserData;
  category: CardCategory;

  constructor(id: string, cardContent: CardUserData, category: CardCategory) {
    this.id = id;
    this.cardContent = cardContent;
    this.category = category;
  }
}
