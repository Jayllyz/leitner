import type { Card } from "../cards/Card";
import type { CardRepository } from "../cards/CardRepository";
import type { ManageQuizz } from "./ManageQuizz";
import { Quizz } from "./Quizz";
import { isCardDateValid } from "./isCardDateValid";

export class QuizzService implements ManageQuizz {
  cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  getTodayQuizz(): Quizz {
    const cards = this.cardRepository.getAllCards();

    const validCards = this.getValidCards(cards);

    return new Quizz(validCards);
  }

  getValidCards(cards: Card[]): Card[] {
    return cards.filter((card) => {
      return isCardDateValid(card);
    });
  }
}
