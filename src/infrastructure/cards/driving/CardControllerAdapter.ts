import type { Card } from "@/domain/cards/Card";
import type { CardUserData } from "@/domain/cards/CardUserData";
import type { ManageCard } from "@/domain/cards/ManageCard";
import type { CardDTO } from "@/infrastructure/DTO/Card/CardDTO";
import type { CardUserDataDTO } from "@/infrastructure/DTO/Card/CardUserDataDTO";
import { mapCardDomainToDTO } from "@/infrastructure/DTO/Card/cardDTOMapper";
import { mapCardUserDataDTOtoDomain } from "@/infrastructure/DTO/Card/cardUserDataDTOMapper";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createCardRoute, getAllCardsRoute } from "./cardRoutes";

export class CardControllerAdapter {
  cardApiHandler: OpenAPIHono;
  cardManager: ManageCard;

  constructor(cardManager: ManageCard) {
    this.cardManager = cardManager;
    this.cardApiHandler = new OpenAPIHono();
    this.addCreateCardRoute();
    this.addGetAllCardRoute();
  }

  private addCreateCardRoute() {
    this.cardApiHandler.openapi(createCardRoute, async (ctx) => {
      const cardUserDataDTO: CardUserDataDTO =
        await ctx.req.json<CardUserDataDTO>();

      const cardUserData: CardUserData =
        mapCardUserDataDTOtoDomain(cardUserDataDTO);

      const createdCard = this.cardManager.createCard(cardUserData);

      const createdCardDTO = mapCardDomainToDTO(createdCard);

      return ctx.json(createdCardDTO, 201);
    });
  }

  private addGetAllCardRoute() {
    this.cardApiHandler.openapi(getAllCardsRoute, async (ctx) => {
      const tags = ctx.req.queries("tags");
      const cards: Card[] = this.cardManager.getAllCards(tags);

      const cardsDTO: CardDTO[] = [];
      for (const card of cards) {
        cardsDTO.push(mapCardDomainToDTO(card));
      }

      return ctx.json(cardsDTO, 200);
    });
  }
}
