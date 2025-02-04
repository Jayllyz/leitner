import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardDTO } from "./CardDTO";
import { mapCardDTOtoDomain, mapCardDomainToDTO } from "./cardDTOMapper";

describe("Card DTO Mapper", () => {
  const fixedDate = new Date("2025-02-04T08:08:28.834Z");
  let realDate: DateConstructor;

  beforeAll(() => {
    // Mock Date to prevent flaky tests
    realDate = global.Date;
    global.Date = class extends Date {
      constructor() {
        super();
        Object.setPrototypeOf(this, fixedDate);
      }
    } as DateConstructor;
  });

  afterAll(() => {
    global.Date = realDate;
  });

  test("should map card dto do domain object", () => {
    const rawDTO: CardDTO = {
      id: "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      category: "SECOND",
      question: "What is hexagonal architecture?",
      answer: "It's a design pattern for organizing code.",
      tag: "architecture",
    };

    const expectedDomainCard = new Card(
      "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      new CardUserData(
        "What is hexagonal architecture?",
        "It's a design pattern for organizing code.",
        "architecture",
      ),
      CardCategory.Second,
    );

    const mappedCard: Card = mapCardDTOtoDomain(rawDTO);
    expect(mappedCard).toEqual(expectedDomainCard);
  });

  test("should map card domain object do dto", () => {
    const cardDomainObject = new Card(
      "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      new CardUserData(
        "What is hexagonal architecture?",
        "It's a design pattern for organizing code.",
        "architecture",
      ),
      CardCategory.Second,
    );

    const expectedDTO: CardDTO = {
      id: "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      category: "SECOND",
      question: "What is hexagonal architecture?",
      answer: "It's a design pattern for organizing code.",
      tag: "architecture",
    };

    const mappedDTO: CardDTO = mapCardDomainToDTO(cardDomainObject);
    expect(mappedDTO).toEqual(expectedDTO);
  });
});
