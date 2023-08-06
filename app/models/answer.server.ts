import { prisma } from "~/db.server";
import type { Answer } from "@prisma/client";

export async function getAnswerById(answerId: string): Promise<Answer | null> {
  return prisma.answer.findUnique({
    where: {
      id: answerId,
    },
    include: {
      question: {
        include: {
          gift: true, // Include the 'gift' relation in the result
        },
      },
    },
  });
}
