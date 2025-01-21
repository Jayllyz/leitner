import { expect, test } from "bun:test";
import { CardCategory } from "@/domain/cards/CardCategory";
import type { CardRepository } from "@/domain/cards/CardRepository";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { ManageCard } from "@/domain/cards/ManageCard";
import { CardService } from "@/domain/cards/cardService";
import app from "@/index";
import { FakeCardRepositoryAdapter } from "@/infrastructure/cards/driven/FakeCardRepositoryAdapter";

test("should create category 1 card from CardService", () => {
  const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
  const cardManager: ManageCard = new CardService(cardRepository);

  const cardQuestion = "How much planets are in our solar system ?";
  const cardAnswer = "43";
  const tag = "Physics";

  const cardContent = new CardUserData(cardQuestion, cardAnswer, tag);

  const createdCard = cardManager.createCard(cardContent);

  expect(createdCard.category).toEqual(CardCategory.First);
});

test("should create category 1 card from user request", async () => {
  const createCardResult = await app.request("/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: "What is pair programming ?",
      answer: "A practice to work in pair on same computer.",
      tag: "Teamwork",
    }),
  });

  expect(createCardResult.status).toBe(201);
  const cardJson = await createCardResult.json();

  const expectedJsonContent = {
    question: "What is pair programming ?",
    answer: "A practice to work in pair on same computer.",
    tag: "Teamwork",
    category: "FIRST",
  };

  const { id, ...cardJsonNoID } = cardJson;

  expect(cardJsonNoID).toEqual(expectedJsonContent);
  expect(id).toBeString();
});
