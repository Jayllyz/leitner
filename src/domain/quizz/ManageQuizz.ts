import type { Card } from "../cards/Card";
import type { Quizz } from "./Quizz";

export interface ManageQuizz {
  getQuizz(date: Date): Quizz;
  validateAnswer(card: Card, isValid: boolean): Card;
}
