-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_caserneId_fkey" FOREIGN KEY ("caserneId") REFERENCES "Caserne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_caserneId_fkey" FOREIGN KEY ("caserneId") REFERENCES "Caserne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
