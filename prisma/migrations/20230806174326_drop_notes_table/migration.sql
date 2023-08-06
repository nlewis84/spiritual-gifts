/*
 Warnings:

 - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
 */
-- DropForeignKey
ALTER TABLE "Note"
  DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Question"
  ADD COLUMN "giftId" TEXT DEFAULT '';

ALTER TABLE "Question"
  ADD COLUMN "questionNumber" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "Note";

-- AddForeignKey
ALTER TABLE "Question"
  ADD CONSTRAINT "Question_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

