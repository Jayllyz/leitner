import { describe, expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardDTO } from "./CardDTO";
import { mapCardDTOtoDomain, mapCardDomainToDTO } from "./cardDTOMapper";

describe("Card DTO Mapper", () => {
  const fixedDate = new Date();

  test("should map card dto to domain object", () => {
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
    expectedDomainCard.lastUpdateDate = fixedDate;

    const mappedCard = mapCardDTOtoDomain(rawDTO);
    mappedCard.lastUpdateDate = fixedDate;

    expect(mappedCard).toEqual(expectedDomainCard);
  });

  test("should map card domain object to dto", () => {
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
