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

export function isCardDateValid(card: Card, date: Date): boolean {
  const targetDate = date;
  let cardDate: Date;
  try {
    cardDate = getCardNextQuizzDate(card);
  } catch {
    return false;
  }

  return (
    targetDate.getDate() === cardDate.getDate() &&
    targetDate.getMonth() === cardDate.getMonth() &&
    targetDate.getFullYear() === cardDate.getFullYear()
  );
}

function getCardNextQuizzDate(card: Card): Date {
  if (card.category === "DONE") {
    throw new Error("Card is already done");
  }

  const cardDate = new Date(card.lastUpdateDate);
  const waitTime = CardCategoryWaitTime[card.category];

  if (waitTime === undefined) {
    throw new Error(`Invalid card category: ${card.category}`);
  }

  cardDate.setDate(cardDate.getDate() + waitTime);

  return cardDate;
}
