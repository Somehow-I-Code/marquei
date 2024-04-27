/*
  Warnings:

  - The `profileLevel` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileLevel",
ADD COLUMN     "profileLevel" "Level" NOT NULL DEFAULT 'USER';
