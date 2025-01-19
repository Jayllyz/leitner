import type { Card } from "./Card";
import type { CardRepository } from "./CardRepository";
import type { CardUserData } from "./CardUserData";
import type { ManageCard } from "./ManageCard";

export class CardService implements ManageCard {
  cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  createCard(cardContent: CardUserData): Card {
    return this.cardRepository.createCard(cardContent);
  }
}
