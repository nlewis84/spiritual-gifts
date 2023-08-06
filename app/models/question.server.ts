import type { Question } from '@prisma/client';
import { prisma } from "~/db.server";

export type { Question } from "@prisma/client";

export async function getQuestions() {
  return prisma.question.findMany();
}

export async function getQuestionById(questionId: string): Promise<Question | null> {
  return prisma.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      gift: true, // Include the 'gift' relation in the result
    },
  });
}