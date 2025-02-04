import type { Quizz } from "./Quizz";

export interface ManageQuizz {
  getQuizz(date: Date): Quizz;
}
