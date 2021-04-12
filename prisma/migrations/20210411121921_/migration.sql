/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,movieId]` on the table `MovieFile`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "MovieFile.name_unique";

-- CreateIndex
CREATE UNIQUE INDEX "MovieFile_UniqueNameForMovie" ON "MovieFile"("name", "movieId");
