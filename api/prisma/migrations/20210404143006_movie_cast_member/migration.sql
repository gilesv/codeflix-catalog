-- CreateTable
CREATE TABLE "_CastMemberToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CastMemberToMovie_AB_unique" ON "_CastMemberToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CastMemberToMovie_B_index" ON "_CastMemberToMovie"("B");

-- AddForeignKey
ALTER TABLE "_CastMemberToMovie" ADD FOREIGN KEY ("A") REFERENCES "CastMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastMemberToMovie" ADD FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
