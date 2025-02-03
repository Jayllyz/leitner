import { describe, expect, test } from "bun:test";
import type { CardRepository } from "@/domain/cards/CardRepository";
import type { ManageQuizz } from "@/domain/quizz/ManageQuizz";
import { QuizzService } from "@/domain/quizz/QuizzService";
import { FakeCardRepositoryAdapter } from "@/infrastructure/cards/driven/FakeCardRepositoryAdapter";

describe("Get today quizz", () => {
  test("should return today quizz", () => {
    const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
    const quizzManager: ManageQuizz = new QuizzService(cardRepository);

    const todayQuizz = quizzManager.getTodayQuizz();

    console.log(todayQuizz.cards);

    expect(todayQuizz.cards).toBeArray();
  });
});
