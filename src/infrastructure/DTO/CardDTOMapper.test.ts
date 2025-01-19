import { expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardDTO } from "./CardDTO";
import { mapCardDTOtoDomain } from "./cardDTOMapper";

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
