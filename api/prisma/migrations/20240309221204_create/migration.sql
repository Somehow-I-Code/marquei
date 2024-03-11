/*
  Warnings:

  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "clubid" INTEGER;

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_clubid_fkey" FOREIGN KEY ("clubid") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
