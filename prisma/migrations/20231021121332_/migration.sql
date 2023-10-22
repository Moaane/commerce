-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_order_id_fkey";

-- AlterTable
ALTER TABLE "order_item" ALTER COLUMN "order_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
