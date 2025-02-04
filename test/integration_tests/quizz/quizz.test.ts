import { describe, expect, test } from "bun:test";
import type { CardRepository } from "@/domain/cards/CardRepository";
import type { ManageQuizz } from "@/domain/quizz/ManageQuizz";
import { QuizzService } from "@/domain/quizz/QuizzService";
import app from "@/index";
import { FakeCardRepositoryAdapter } from "@/infrastructure/cards/driven/FakeCardRepositoryAdapter";

describe("Get today quizz", () => {
  test("should return today quizz", () => {
    const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
    const quizzManager: ManageQuizz = new QuizzService(cardRepository);

    const todayQuizz = quizzManager.getQuizz(new Date());

    expect(todayQuizz.cards).toBeArray();
    expect(todayQuizz.cards).not.toBeEmpty();
  });

  test("get today quizz", async () => {
    const quizzResult = await app.request("/cards/quizz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(quizzResult.status).toBe(200);
    const quizzJson = await quizzResult.json();

    expect(quizzJson).toBeArray();
    expect(quizzJson).not.toBeEmpty();
  });
});
