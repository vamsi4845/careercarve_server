/*
  Warnings:

  - You are about to drop the column `availability` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `premiumService` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `AreaOfInterest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorExpertise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentInterest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `areaOfExpertise` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaOfInterest` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MentorExpertise` DROP FOREIGN KEY `MentorExpertise_areaOfInterestId_fkey`;

-- DropForeignKey
ALTER TABLE `MentorExpertise` DROP FOREIGN KEY `MentorExpertise_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentInterest` DROP FOREIGN KEY `StudentInterest_areaOfInterestId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentInterest` DROP FOREIGN KEY `StudentInterest_studentId_fkey`;

-- AlterTable
ALTER TABLE `Mentor` DROP COLUMN `availability`,
    ADD COLUMN `areaOfExpertise` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `premiumService`,
    DROP COLUMN `scheduleId`,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `mentorId` INTEGER NOT NULL,
    ADD COLUMN `studentId` INTEGER NOT NULL,
    MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `duration`,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `areaOfInterest` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `AreaOfInterest`;

-- DropTable
DROP TABLE `MentorExpertise`;

-- DropTable
DROP TABLE `StudentInterest`;

-- CreateTable
CREATE TABLE `Availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dayOfWeek` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `mentorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Availability` ADD CONSTRAINT `Availability_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
