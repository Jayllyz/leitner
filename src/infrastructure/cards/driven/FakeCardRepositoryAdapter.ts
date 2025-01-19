import { Card } from "@/domain/cards/Card";
import type { CardCategory } from "@/domain/cards/CardCategory";
import type { CardRepository } from "@/domain/cards/CardRepository";
import type { CardUserData } from "@/domain/cards/CardUserData";

export class FakeCardRepositoryAdapter implements CardRepository {
  private cards: Card[] = [];

  public createCard(
    cardContent: CardUserData,
    cardCategory: CardCategory,
  ): Card {
    const newCardId = this.cards.length;
    const newCard = new Card(newCardId, cardContent, cardCategory);

    this.cards.push(newCard);
    return newCard;
  }
}
