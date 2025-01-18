import type { CardContent } from "./CardParameter";

export class Card {
  id: number;
  cardContent: CardContent;

  constructor(id: number, cardContent: CardContent) {
    this.id = id;
    this.cardContent = cardContent;
  }
}
