/*
  Warnings:

  - You are about to drop the column `total` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_giftId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "total",
ADD COLUMN     "administration" INTEGER,
ADD COLUMN     "apostleship" INTEGER,
ADD COLUMN     "discernment" INTEGER,
ADD COLUMN     "evangelism" INTEGER,
ADD COLUMN     "exhortation" INTEGER,
ADD COLUMN     "faith" INTEGER,
ADD COLUMN     "giving" INTEGER,
ADD COLUMN     "hospitality" INTEGER,
ADD COLUMN     "knowledge" INTEGER,
ADD COLUMN     "leadership" INTEGER,
ADD COLUMN     "mercy" INTEGER,
ADD COLUMN     "prophecy" INTEGER,
ADD COLUMN     "serviceHelps" INTEGER,
ADD COLUMN     "shepherding" INTEGER,
ADD COLUMN     "teaching" INTEGER,
ADD COLUMN     "wisdom" INTEGER,
ALTER COLUMN "giftId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
