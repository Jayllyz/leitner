import type { Card } from "../cards/Card";

export class Quizz {
  cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }
}
