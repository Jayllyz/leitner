import { Card } from "@/domain/cards/Card";
import type { CardCategory } from "@/domain/cards/CardCategory";
import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardDTO } from "./CardDTO";

export function mapCardDTOtoDomain(dto: CardDTO): Card {
  const cardContent: CardUserData = new CardUserData(
    dto.question,
    dto.answer,
    dto.tag ?? undefined,
  );

  const cardCategory: CardCategory = dto.category as CardCategory;

  return new Card(dto.id, cardContent, cardCategory);
}
