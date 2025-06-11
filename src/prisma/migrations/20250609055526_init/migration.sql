-- CreateTable
CREATE TABLE "general_divisi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "general_divisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_projects" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_selesai" DATE NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "divisi_id" INTEGER,

    CONSTRAINT "general_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_project_user" (
    "id" SERIAL NOT NULL,
    "general_project_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "general_project_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "squads" (
    "id" SERIAL NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "general_project_id" INTEGER NOT NULL,
    "anggota" JSONB,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "squads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "remember_token" VARCHAR(100),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "custom_fields" JSONB,
    "avatar_url" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "general_projects" ADD CONSTRAINT "general_projects_divisi_id_fkey" FOREIGN KEY ("divisi_id") REFERENCES "general_divisi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_project_user" ADD CONSTRAINT "general_project_user_general_project_id_fkey" FOREIGN KEY ("general_project_id") REFERENCES "general_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_project_user" ADD CONSTRAINT "general_project_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squads" ADD CONSTRAINT "squads_general_project_id_fkey" FOREIGN KEY ("general_project_id") REFERENCES "general_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
