import {Prisma} from "@prisma/client";

export const returnOrderObject: Prisma.OrderSelect = {
  id: true,
  status: true
}