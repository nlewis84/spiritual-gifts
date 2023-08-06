import { prisma } from "~/db.server";

export type { Question } from "@prisma/client";

export async function getQuestions() {
  return prisma.question.findMany();
}