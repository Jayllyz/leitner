import type { Card } from "../cards/Card";

interface CardCategoryWaitTime {
  [key: string]: number;
}

const CardCategoryWaitTime: CardCategoryWaitTime = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 4,
  FOURTH: 8,
  FIFTH: 16,
  SIXTH: 32,
  SEVENTH: 64,
};

export function isCardDateValid(card: Card): boolean {
  const today = new Date();
  const cardDate = getCardNextQuizzDate(card);

  return (
    today.getDate() === cardDate.getDate() &&
    today.getMonth() === cardDate.getMonth() &&
    today.getFullYear() === cardDate.getFullYear()
  );
}

function getCardNextQuizzDate(card: Card): Date {
  const cardDate = new Date(card.lastUpdateDate);
  const waitTime = CardCategoryWaitTime[card.category];

  if (waitTime === undefined) {
    throw new Error(`Invalid card category: ${card.category}`);
  }

  cardDate.setDate(cardDate.getDate() + waitTime);

  return cardDate;
}
