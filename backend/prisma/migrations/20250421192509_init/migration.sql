-- CreateTable
CREATE TABLE "Planning" (
    "id" SERIAL NOT NULL,
    "pompierId" INTEGER NOT NULL,
    "annee" INTEGER NOT NULL,
    "nrSemaine" INTEGER NOT NULL,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_pompierId_fkey" FOREIGN KEY ("pompierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
