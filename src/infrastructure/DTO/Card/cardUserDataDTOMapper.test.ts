import { expect, test } from "bun:test";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardUserDataDTO } from "./CardUserDataDTO";
import { mapCardUserDataDTOtoDomain } from "./cardUserDataDTOMapper";

test("should map card user data dto do domain object", () => {
  const rawDTO: CardUserDataDTO = {
    question: "What is hexagonal architecture?",
    answer: "It's a design pattern for organizing code.",
    tag: "architecture",
  };

  const expectedDomainCardUserData = new CardUserData(
    "What is hexagonal architecture?",
    "It's a design pattern for organizing code.",
    "architecture",
  );

  const mappedCardUserData: CardUserData = mapCardUserDataDTOtoDomain(rawDTO);

  expect(mappedCardUserData).toEqual(expectedDomainCardUserData);
});
