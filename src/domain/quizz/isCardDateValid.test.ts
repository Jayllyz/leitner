import { describe, expect, test } from "bun:test";
import { Card } from "@/domain/cards/Card";
import { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import { isCardDateValid } from "@/domain/quizz/isCardDateValid";

describe("isCardDateValid", () => {
  test("card should be valid when card was created yesterday and date is today", () => {
    const cardDomainObject = new Card(
      "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
      new CardUserData(
        "What is hexagonal architecture?",
        "It's a design pattern for organizing code.",
        "architecture",
      ),
      CardCategory.First,
    );

    expect(isCardDateValid(cardDomainObject));
  });
});
