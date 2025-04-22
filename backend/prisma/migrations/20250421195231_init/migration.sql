/*
  Warnings:

  - Added the required column `data` to the `Planning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Planning" ADD COLUMN     "data" JSONB NOT NULL;
