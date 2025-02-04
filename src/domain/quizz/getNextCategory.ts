import type { Card } from "../cards/Card";
import { CardCategory } from "../cards/CardCategory";

interface SuccessorCategory {
  [key: string]: CardCategory;
}

const successorCategory: SuccessorCategory = {
  FIRST: CardCategory.Second,
  SECOND: CardCategory.Third,
  THIRD: CardCategory.Fourth,
  FOURTH: CardCategory.Fifth,
  FIFTH: CardCategory.Sixth,
  SIXTH: CardCategory.Seventh,
  SEVENTH: CardCategory.Done,
};

export function getNextCategory(card: Card): CardCategory {
  const nextCategory = successorCategory[card.category];

  if (nextCategory === undefined) {
    throw new Error(`Invalid card category: ${card.category}`);
  }

  return nextCategory;
}
