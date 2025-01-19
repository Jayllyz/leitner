import type { CardUserData } from "./CardParameter";

export class Card {
  id: number;
  cardContent: CardUserData;

  constructor(id: number, cardContent: CardUserData) {
    this.id = id;
    this.cardContent = cardContent;
  }
}
