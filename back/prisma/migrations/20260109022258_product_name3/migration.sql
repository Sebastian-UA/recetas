/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `ingrediente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ingrediente_nombre_key" ON "ingrediente"("nombre");
