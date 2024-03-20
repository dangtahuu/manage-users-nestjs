/*
  Warnings:

  - You are about to drop the column `bio` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `bio`,
    ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bio`,
    ADD COLUMN `name` VARCHAR(191) NULL;
