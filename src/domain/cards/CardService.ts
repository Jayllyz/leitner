import type { Card } from "./Card";
import { CardCategory } from "./CardCategory";
import type { CardRepository } from "./CardRepository";
import type { CardUserData } from "./CardUserData";
import type { ManageCard } from "./ManageCard";

export class CardService implements ManageCard {
  constructor(private readonly cardRepository: CardRepository) {}

  createCard(cardContent: CardUserData): Card {
    return this.cardRepository.createCard(cardContent, CardCategory.First);
  }

  getAllCards(tags?: string[]): Card[] {
    const allCards = this.cardRepository.getAllCards();
    if (this.shouldReturnAllCards(tags)) {
      return allCards;
    }

    return this.getFilteredCards(allCards, tags as string[]);
  }

  getCardById(id: string): Card {
    return this.cardRepository.getCardById(id);
  }

  private shouldReturnAllCards(tags?: string[]): boolean {
    return !tags?.length;
  }

  private getFilteredCards(cards: Card[], tags: string[]): Card[] {
    return cards.filter((card) => this.hasMatchingTags(card, tags));
  }

  private hasMatchingTags(card: Card, tags: string[]): boolean {
    return tags.some((tag) => card.cardContent.tag?.includes(tag));
  }
}
