/*
  Warnings:

  - You are about to drop the column `effectifAct` on the `Caserne` table. All the data in the column will be lost.
  - You are about to drop the column `groupement` on the `Caserne` table. All the data in the column will be lost.
  - You are about to drop the column `maxEffectif` on the `Caserne` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Planning` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[caserneId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Planning" DROP CONSTRAINT "Planning_pompierId_fkey";

-- AlterTable
ALTER TABLE "Caserne" DROP COLUMN "effectifAct",
DROP COLUMN "groupement",
DROP COLUMN "maxEffectif";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "grade",
DROP COLUMN "status";

-- DropTable
DROP TABLE "Planning";

-- CreateIndex
CREATE UNIQUE INDEX "User_caserneId_key" ON "User"("caserneId");
