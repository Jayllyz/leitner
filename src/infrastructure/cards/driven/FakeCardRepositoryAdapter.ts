import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import type { CardRepository } from "@/domain/cards/CardRepository";
import { CardUserData } from "@/domain/cards/CardUserData";
import { randomUUIDv7 } from "bun";

export class FakeCardRepositoryAdapter implements CardRepository {
  private cards: Card[];

  constructor() {
    this.cards = [];
    this.createFakeCards();
  }

  public createCard(
    cardContent: CardUserData,
    cardCategory: CardCategory,
    cardDate?: Date,
  ): Card {
    const randomId = randomUUIDv7();
    const newCard = new Card(randomId, cardContent, cardCategory, cardDate);

    this.cards.push(newCard);
    return newCard;
  }

  getAllCards(): Card[] {
    return this.cards;
  }

  getCardById(id: string): Card {
    const card = this.cards.find((card) => card.id === id);

    if (!card) {
      throw new Error(`Card with id ${id} not found`);
    }

    return card;
  }

  private createFakeCards() {
    const today = new Date();
    const cardDate = new Date(today);
    const cardDate2 = new Date(today);

    cardDate.setDate(today.getDate() - 1);
    this.createCard(
      new CardUserData(
        "What is TypeScript?",
        "TypeScript is a typed superset of JavaScript.",
        "programming",
      ),
      CardCategory.First,
      cardDate,
    );
    this.createCard(
      new CardUserData(
        "What is React?",
        "React is a JavaScript library for building user interfaces.",
        "web",
      ),
      CardCategory.First,
    );
    this.createCard(
      new CardUserData(
        "What is the capital of France?",
        "The capital of France is Paris.",
        "geography",
      ),
      CardCategory.Second,
    );

    cardDate2.setDate(today.getDate() - 8);
    this.createCard(
      new CardUserData(
        "Who wrote 'Hamlet'?",
        "William Shakespeare wrote 'Hamlet'.",
        "literature",
      ),
      CardCategory.Fourth,
      cardDate2,
    );

    this.createCard(
      new CardUserData("How do I cook meth", "I don't know", "chemistry"),
      CardCategory.Done,
    );
  }
}
