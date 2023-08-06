/*
  Warnings:

  - You are about to drop the column `giftId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_giftId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "giftId";
