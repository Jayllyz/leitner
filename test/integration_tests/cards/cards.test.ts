import { beforeAll, describe, expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import type { CardRepository } from "@/domain/cards/CardRepository";
import { CardService } from "@/domain/cards/CardService";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { ManageCard } from "@/domain/cards/ManageCard";
import app from "@/index";
import { FakeCardRepositoryAdapter } from "@/infrastructure/cards/driven/FakeCardRepositoryAdapter";

describe("card creation test", () => {
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

  test("should create category 1 card from user request without tag", async () => {
    const createCardResult = await app.request("/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "What does 1+1 equals ?",
        answer: "One",
      }),
    });

    expect(createCardResult.status).toBe(201);
    const cardJson = await createCardResult.json();

    const expectedJsonContent = {
      question: "What does 1+1 equals ?",
      answer: "One",
      category: "FIRST",
    };

    const { id, ...cardJsonNoID } = cardJson;

    expect(cardJsonNoID).toEqual(expectedJsonContent);
    expect(id).toBeString();
  });

  test("should throw error when trying to create card from user request without answer", async () => {
    const createCardResult = await app.request("/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "What does 1+1 equals ?",
      }),
    });

    expect(createCardResult.status).toBe(400);
  });

  test("should throw error when trying to create card from user request without question", async () => {
    const createCardResult = await app.request("/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: "One",
      }),
    });

    expect(createCardResult.status).toBe(400);
  });
});

describe("get cards", () => {
  let cardRepository: CardRepository;
  let cardManager: ManageCard;

  beforeAll(() => {
    cardRepository = new FakeCardRepositoryAdapter();
    cardManager = new CardService(cardRepository);

    cardManager.createCard(
      new CardUserData("de quel couleur est cars", "rouge", "Cars"),
    );
    cardManager.createCard(new CardUserData("que boit la vache", "du lait"));
  });

  test("should get all cards from CardService", () => {
    const cards = cardManager.getAllCards();

    expect(cards).toBeArray();
    expect(cards).not.toBeEmpty();
    for (const card of cards) {
      expect(card).toBeInstanceOf(Card);
    }
  });

  test("should get all cards from CardService with tag", () => {
    const cards = cardManager.getAllCards(["Cars"]);

    expect(cards).toBeArray();
    expect(cards).toHaveLength(1);
  });

  test("should get all cards from user request", async () => {
    const cardsResult = await app.request("/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(cardsResult.status).toBe(200);
    const cardsJson = await cardsResult.json();

    expect(cardsJson).toBeArray();
    expect(cardsJson).not.toBeEmpty();
  });

  test("should get all cards from user request with tag", async () => {
    const cardsResult = await app.request("/cards?tags=Teamwork", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(cardsResult.status).toBe(200);
    const cardsJson = await cardsResult.json();

    expect(cardsJson).toBeArray();
    expect(cardsJson).toHaveLength(1);
  });

  test("should get one card", async () => {
    const cards = cardManager.getAllCards();
    const card = cards[0];

    if (!card) {
      throw new Error("No card found");
    }

    const cardResult = cardManager.getCardById(card.id);

    expect(cardResult).toEqual(card);
  });
});
