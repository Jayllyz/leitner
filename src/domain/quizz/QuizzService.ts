import type { Card } from "../cards/Card";
import { CardCategory } from "../cards/CardCategory";
import type { CardRepository } from "../cards/CardRepository";
import type { ManageQuizz } from "./ManageQuizz";
import { Quizz } from "./Quizz";
import { getNextCategory } from "./getNextCategory";
import { isCardDateValid } from "./isCardDateValid";

export class QuizzService implements ManageQuizz {
  cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  getQuizz(date: Date): Quizz {
    const cards = this.cardRepository.getAllCards();

    const validCards = this.getValidCards(cards, date);

    return new Quizz(validCards);
  }

  getValidCards(cards: Card[], date: Date): Card[] {
    return cards.filter((card) => {
      return isCardDateValid(card, date);
    });
  }

  validateAnswer(card: Card, isValid: boolean): Card {
    if (!isValid) {
      card.category = CardCategory.First;
      card.lastUpdateDate = new Date();
      return card;
    }

    card.category = getNextCategory(card);
    card.lastUpdateDate = new Date();
    return card;
  }
}
