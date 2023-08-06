import { prisma } from "~/db.server";

export type { Question } from "@prisma/client";

export async function getGifts() {
  return prisma.gift.findMany();
}