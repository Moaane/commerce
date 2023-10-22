/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_order_id_fkey";

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "order_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "order";

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
