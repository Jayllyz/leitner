import { Card } from "@/domain/cards/Card";
import type { CardCategory } from "@/domain/cards/CardCategory";
import type { CardRepository } from "@/domain/cards/CardRepository";
import type { CardUserData } from "@/domain/cards/CardUserData";
import { randomUUIDv7 } from "bun";

export class FakeCardRepositoryAdapter implements CardRepository {
  private cards: Card[];

  constructor() {
    this.cards = [];
  }

  public createCard(
    cardContent: CardUserData,
    cardCategory: CardCategory,
  ): Card {
    const randomId = randomUUIDv7();
    const newCard = new Card(randomId, cardContent, cardCategory);

    this.cards.push(newCard);
    return newCard;
  }
}
