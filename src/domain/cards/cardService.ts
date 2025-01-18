import type { Card } from "./Card";
import type { CardContent } from "./CardParameter";
import type { CardRepository } from "./CardRepository";
import type { ManageCard } from "./ManageCard";

export class CardService implements ManageCard {
  cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  createCard(cardContent: CardContent): Card {
    return this.cardRepository.createCard(cardContent);
  }
}
