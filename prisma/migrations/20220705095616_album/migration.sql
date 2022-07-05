/*
  Warnings:

  - You are about to drop the column `userId` on the `Song` table. All the data in the column will be lost.
  - Added the required column `profile` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "profile" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "userId",
ADD COLUMN     "albumId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SongToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongToUser_AB_unique" ON "_SongToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToUser_B_index" ON "_SongToUser"("B");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToUser" ADD FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
