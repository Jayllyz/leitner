import type { Card } from "./Card";
import { CardCategory } from "./CardCategory";
import type { CardRepository } from "./CardRepository";
import type { CardUserData } from "./CardUserData";
import type { ManageCard } from "./ManageCard";

export class CardService implements ManageCard {
  cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  createCard(cardContent: CardUserData): Card {
    return this.cardRepository.createCard(cardContent, CardCategory.First);
  }

  getAllCards(tags?: string[]): Card[] {
    if (!tags || tags.length === 0) {
      return this.cardRepository.getAllCards();
    }

    return this.cardRepository
      .getAllCards()
      .filter((card) => this.hasMatchingTags(card, tags));
  }

  private hasMatchingTags(card: Card, tags: string[]): boolean {
    return tags.some((tag) => card.cardContent.tag?.includes(tag));
  }
}
