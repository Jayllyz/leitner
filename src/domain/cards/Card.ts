import type { CardCategory } from "./CardCategory";
import type { CardUserData } from "./CardUserData";

export class Card {
  id: number;
  cardContent: CardUserData;
  category: CardCategory;

  constructor(id: number, cardContent: CardUserData, category: CardCategory) {
    this.id = id;
    this.cardContent = cardContent;
    this.category = category;
  }
}
