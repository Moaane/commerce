/*
  Warnings:

  - Added the required column `totalPrice` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "totalPrice" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
