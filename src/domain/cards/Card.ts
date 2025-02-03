import type { CardCategory } from "./CardCategory";
import type { CardUserData } from "./CardUserData";

export class Card {
  id: string;
  cardContent: CardUserData;
  category: CardCategory;
  lastUpdateDate: Date;

  constructor(
    id: string,
    cardContent: CardUserData,
    category: CardCategory,
    cardDate?: Date,
  ) {
    this.id = id;
    this.cardContent = cardContent;
    this.category = category;
    this.lastUpdateDate = cardDate ? cardDate : new Date();
  }
}
