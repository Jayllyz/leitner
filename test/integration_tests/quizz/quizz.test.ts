import { describe, expect, test } from "bun:test";
import { CardCategory } from "@/domain/cards/CardCategory";
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

describe("Validate answer", () => {
  test("should update card category to First and date to today", () => {
    const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
    const quizzManager: ManageQuizz = new QuizzService(cardRepository);

    let card = cardRepository.getAllCards()[0];

    if (!card) {
      throw new Error("No card found");
    }

    card.category = CardCategory.Fourth;
    card = quizzManager.validateAnswer(card, false);

    expect(card.category).toBe(CardCategory.First);
    expect(card.lastUpdateDate.toDateString()).toBe(new Date().toDateString());
  });

  test("should update card category to Second and date to today", () => {
    const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
    const quizzManager: ManageQuizz = new QuizzService(cardRepository);

    let card = cardRepository.getAllCards()[0];

    if (!card) {
      throw new Error("No card found");
    }

    card.category = CardCategory.First;
    card = quizzManager.validateAnswer(card, true);

    expect(card.category).toBe(CardCategory.Second);
    expect(card.lastUpdateDate.toDateString()).toBe(new Date().toDateString());
  });

  test("answer a card", async () => {
    const createCardResult = await app.request("/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "TEST",
        answer: "TEST",
      }),
    });

    const card = await createCardResult.json();

    const route = `/cards/${card.id}/answer`;
    const routeResult = await app.request(route, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isValid: true }),
    });

    expect(routeResult.status).toBe(204);
  });
});
