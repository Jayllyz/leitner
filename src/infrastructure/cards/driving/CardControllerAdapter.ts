import type { Card } from "@/domain/cards/Card";
import type { CardUserData } from "@/domain/cards/CardUserData";
import type { ManageCard } from "@/domain/cards/ManageCard";
import type { ManageQuizz } from "@/domain/quizz/ManageQuizz";
import type { Quizz } from "@/domain/quizz/Quizz";
import type { CardDTO } from "@/infrastructure/DTO/Card/CardDTO";
import type { CardUserDataDTO } from "@/infrastructure/DTO/Card/CardUserDataDTO";
import { mapCardDomainToDTO } from "@/infrastructure/DTO/Card/cardDTOMapper";
import { mapCardUserDataDTOtoDomain } from "@/infrastructure/DTO/Card/cardUserDataDTOMapper";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createCardRoute, getAllCardsRoute, getQuizzRoute } from "./cardRoutes";

export class CardControllerAdapter {
  cardApiHandler: OpenAPIHono;
  cardManager: ManageCard;
  quizzManager: ManageQuizz;

  constructor(cardManager: ManageCard, quizzManager: ManageQuizz) {
    this.cardManager = cardManager;
    this.quizzManager = quizzManager;
    this.cardApiHandler = new OpenAPIHono();
    this.addGetAllCardRoute();
    this.addCreateCardRoute();
    this.addGetQuizzRoute();
  }

  private addGetAllCardRoute() {
    this.cardApiHandler.openapi(getAllCardsRoute, async (ctx) => {
      const { tags } = ctx.req.valid("query");
      const cards: Card[] = this.cardManager.getAllCards(tags);

      const cardsDTO: CardDTO[] = [];
      for (const card of cards) {
        cardsDTO.push(mapCardDomainToDTO(card));
      }

      return ctx.json(cardsDTO, 200);
    });
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

  private addGetQuizzRoute() {
    this.cardApiHandler.openapi(getQuizzRoute, async (ctx) => {
      const { date } = ctx.req.query();
      const formattedDate = date ? new Date(date) : new Date();

      const quizz: Quizz = this.quizzManager.getQuizz(formattedDate);
      const cardsDTO: CardDTO[] = [];
      for (const card of quizz.cards) {
        cardsDTO.push(mapCardDomainToDTO(card));
      }

      return ctx.json(cardsDTO, 200);
    });
  }
}
