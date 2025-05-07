/*
  Warnings:

  - You are about to drop the column `caserneId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userOwnerId` to the `Caserne` table without a default value. This is not possible if the table is not empty.
  - Added the required column `money` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dateNaissance` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_caserneId_fkey";

-- DropIndex
DROP INDEX "User_caserneId_key";

-- AlterTable
ALTER TABLE "Caserne" ADD COLUMN     "userOwnerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "caserneId",
ADD COLUMN     "money" INTEGER NOT NULL,
DROP COLUMN "dateNaissance",
ADD COLUMN     "dateNaissance" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Caserne" ADD CONSTRAINT "Caserne_userOwnerId_fkey" FOREIGN KEY ("userOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
