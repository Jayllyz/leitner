import { Card } from "@/domain/cards/Card";
import type { CardUserData } from "@/domain/cards/CardParameter";
import type { CardRepository } from "@/domain/cards/CardRepository";

export class FakeCardRepositoryAdapter implements CardRepository {
  private cards: Card[] = [];

  public createCard(cardContent: CardUserData): Card {
    const newCardId = this.cards.length;
    const newCard = new Card(newCardId, cardContent);

    this.cards.push(newCard);
    return newCard;
  }
}
