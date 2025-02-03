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

export function mapCardDomainToDTO(card: Card): CardDTO {
  return {
    id: card.id,
    question: card.cardContent.question,
    answer: card.cardContent.answer,
    tag: card.cardContent.tag,
    category: card.category,
  };
}
