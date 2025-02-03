import type { Card } from "../cards/Card";

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
  const CATEGORY_WAITING_TIME = 1;

  const cardDate = new Date(card.lastUpdateDate);
  cardDate.setDate(cardDate.getDate() + CATEGORY_WAITING_TIME);

  return cardDate;
}
