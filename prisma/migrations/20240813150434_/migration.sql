/*
  Warnings:

  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "priceCurrency" AS ENUM ('JPY', 'USD');

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "stock" INTEGER,
    "status" "status",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "parentTagId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToShop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTag_AB_unique" ON "_ProductToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToShop_AB_unique" ON "_ProductToShop"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToShop_B_index" ON "_ProductToShop"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_parentTagId_fkey" FOREIGN KEY ("parentTagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToShop" ADD CONSTRAINT "_ProductToShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToShop" ADD CONSTRAINT "_ProductToShop_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
