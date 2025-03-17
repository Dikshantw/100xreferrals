/*
  Warnings:

  - You are about to drop the column `scholaship` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "scholaship",
ADD COLUMN     "scholarship" TEXT;
