import { describe, expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import { getNextCategory } from "./getNextCategory";

describe("getNextCategory", () => {
  test("should return category Second on category First", () => {
    const cardDomainObject = new Card(
      "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      new CardUserData(
        "What is hexagonal architecture?",
        "It's a design pattern for organizing code.",
        "architecture",
      ),
      CardCategory.First,
    );

    expect(getNextCategory(cardDomainObject)).toBe(CardCategory.Second);
  });

  test("should return category Fifth on category Fourth", () => {
    const cardDomainObject = new Card(
      "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      new CardUserData(
        "What is hexagonal architecture?",
        "It's a design pattern for organizing code.",
        "architecture",
      ),
      CardCategory.Fourth,
    );

    expect(getNextCategory(cardDomainObject)).toBe(CardCategory.Fifth);
  });
});
