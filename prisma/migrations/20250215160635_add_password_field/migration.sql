/*
  Warnings:

  - Added the required column `password` to the `Interpreter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Interpreter" ADD COLUMN     "coordinatorsId" INTEGER,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "student_email" TEXT NOT NULL,
    "name_of_event" TEXT NOT NULL,
    "time_of_event" TEXT NOT NULL,
    "location_of_event" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "interpreterId" INTEGER,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Coordinators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Requests_student_email_key" ON "Requests"("student_email");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinators_email_key" ON "Coordinators"("email");

-- AddForeignKey
ALTER TABLE "Interpreter" ADD CONSTRAINT "Interpreter_coordinatorsId_fkey" FOREIGN KEY ("coordinatorsId") REFERENCES "Coordinators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "Interpreter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
