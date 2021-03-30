-- CreateEnum
CREATE TYPE "CastMemberKind" AS ENUM ('DIRECTOR', 'ACTOR');

-- CreateTable
CREATE TABLE "CastMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CastMemberKind" NOT NULL DEFAULT E'ACTOR',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);
