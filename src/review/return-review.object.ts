import {Prisma} from "@prisma/client";

export const returnReviewObject: Prisma.ReviewSelect = {
  id: true,
  text: true,
  rating: true
}