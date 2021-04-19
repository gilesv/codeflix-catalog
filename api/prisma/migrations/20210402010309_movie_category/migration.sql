-- CreateTable
CREATE TABLE "_CategoryToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMovie_AB_unique" ON "_CategoryToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMovie_B_index" ON "_CategoryToMovie"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToMovie" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMovie" ADD FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
