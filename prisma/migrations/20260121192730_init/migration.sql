-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- Data Migration: Insert test posts
INSERT INTO "Post" ("title", "content", "updatedAt") 
VALUES 
('First Post', 'This is the content of the first post.', CURRENT_TIMESTAMP),
('Second Post', 'Hello world from Prisma and PostgreSQL!', CURRENT_TIMESTAMP),
('Third Post', 'This is the content of the third post.', CURRENT_TIMESTAMP),
('Fourth Post', 'Hello world from Prisma and PostgreSQL!', CURRENT_TIMESTAMP),
('Fifth Post', 'This is the content of the fifth post.', CURRENT_TIMESTAMP),
('Sixth Post', 'Hello world from Prisma and PostgreSQL!', CURRENT_TIMESTAMP),
('Seventh Post', 'This is the content of the seventh post.', CURRENT_TIMESTAMP),
('Eighth Post', 'Hello world from Prisma and PostgreSQL!', CURRENT_TIMESTAMP),
('Ninth Post', 'This is the content of the ninth post.', CURRENT_TIMESTAMP),
('Tenth Post', 'Hello world from Prisma and PostgreSQL!', CURRENT_TIMESTAMP);

