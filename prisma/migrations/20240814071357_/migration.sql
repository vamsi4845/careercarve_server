/*
  Warnings:

  - You are about to drop the column `areaOfInterest` on the `Mentor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Mentor` DROP COLUMN `areaOfInterest`;

-- CreateTable
CREATE TABLE `AreaOfInterest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AreaOfInterest_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentInterest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `areaOfInterestId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MentorExpertise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorId` INTEGER NOT NULL,
    `areaOfInterestId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentInterest` ADD CONSTRAINT `StudentInterest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInterest` ADD CONSTRAINT `StudentInterest_areaOfInterestId_fkey` FOREIGN KEY (`areaOfInterestId`) REFERENCES `AreaOfInterest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorExpertise` ADD CONSTRAINT `MentorExpertise_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorExpertise` ADD CONSTRAINT `MentorExpertise_areaOfInterestId_fkey` FOREIGN KEY (`areaOfInterestId`) REFERENCES `AreaOfInterest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
