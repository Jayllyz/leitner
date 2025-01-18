import { expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardContent } from "@/domain/cards/CardParameter";
import type { CardRepository } from "@/domain/cards/CardRepository";
import type { ManageCard } from "@/domain/cards/ManageCard";
import { CardService } from "@/domain/cards/cardService";
import { FakeCardRepositoryAdapter } from "@/infrastructure/cards/driven/FakeCardRepositoryAdapter";

test("should create category 1 card in repository", () => {
  const cardRepository: CardRepository = new FakeCardRepositoryAdapter();
  const cardManager: ManageCard = new CardService(cardRepository);

  const cardId = 0;
  const cardQuestion = "How much planets are in our solar system ?";
  const cardAnswer = "43";
  const tag = "Physics";

  const cardContent = new CardContent(cardQuestion, cardAnswer, tag);

  const createdCard = cardManager.createCard(cardContent);

  const expectedCard = new Card(cardId, cardContent);

  expect(createdCard).toEqual(expectedCard);
});
