/*
  Warnings:

  - You are about to drop the column `created_at` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order_item` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_userId_fkey";

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "userId",
ADD COLUMN     "order_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
