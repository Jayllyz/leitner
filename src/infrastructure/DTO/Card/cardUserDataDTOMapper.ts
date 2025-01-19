import { CardUserData } from "@/domain/cards/CardUserData";
import type { CardUserDataDTO } from "./CardUserDataDTO";

export function mapCardUserDataDTOtoDomain(dto: CardUserDataDTO): CardUserData {
  return new CardUserData(dto.question, dto.answer, dto.tag ?? undefined);
}
