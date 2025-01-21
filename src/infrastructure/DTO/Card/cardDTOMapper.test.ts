import { expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardDTO } from "./CardDTO";
import { mapCardDTOtoDomain, mapCardDomainToDTO } from "./cardDTOMapper";

test("should map card dto do domain object", () => {
  const rawDTO: CardDTO = {
    id: 1,
    category: "SECOND",
    question: "What is hexagonal architecture?",
    answer: "It's a design pattern for organizing code.",
    tag: "architecture",
  };

  const expectedDomainCard = new Card(
    1,
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
    1,
    new CardUserData(
      "What is hexagonal architecture?",
      "It's a design pattern for organizing code.",
      "architecture",
    ),
    CardCategory.Second,
  );

  const expectedDTO: CardDTO = {
    id: 1,
    category: "SECOND",
    question: "What is hexagonal architecture?",
    answer: "It's a design pattern for organizing code.",
    tag: "architecture",
  };

  const mappedDTO: CardDTO = mapCardDomainToDTO(cardDomainObject);

  expect(mappedDTO).toEqual(expectedDTO);
});
