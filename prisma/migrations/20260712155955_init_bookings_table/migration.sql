-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student_name" TEXT NOT NULL,
    "student_email" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "google_event_id" TEXT NOT NULL,
    "meet_link" TEXT,
    "status" TEXT NOT NULL DEFAULT 'confirmed',

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);
