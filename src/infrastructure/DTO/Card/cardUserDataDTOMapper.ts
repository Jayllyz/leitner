import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardUserDataDTO } from "./CardUserDataDTO";

export function mapCardUserDataDTOtoDomain(
  cardDto: CardUserDataDTO,
): CardUserData {
  return new CardUserData(
    cardDto.question,
    cardDto.answer,
    cardDto.tag ?? undefined,
  );
}

export function mapCardUserDataDomainToDTO(
  cardUserData: CardUserData,
): CardUserDataDTO {
  return {
    question: cardUserData.question,
    answer: cardUserData.answer,
    tag: cardUserData.tag ?? null,
  };
}
