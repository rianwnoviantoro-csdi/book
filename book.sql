-- -------------------------------------------------------------
-- -------------------------------------------------------------
-- TablePlus 1.1.8
--
-- https://tableplus.com/
--
-- Database: postgres
-- Generation Time: 2024-06-08 23:36:07.953468
-- -------------------------------------------------------------

DROP TABLE "public"."books";


-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Table Definition
CREATE TABLE "public"."books" (
    "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "code" varchar NOT NULL,
    "name" varchar NOT NULL,
    "author" varchar NOT NULL,
    "stock" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("_id")
);

DROP TABLE "public"."borrows";


-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Table Definition
CREATE TABLE "public"."borrows" (
    "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "code" varchar NOT NULL,
    "date_borrowed" timestamp NOT NULL,
    "date_returned" timestamp,
    "status" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "member_id" uuid NOT NULL,
    "book_id" uuid NOT NULL,
    PRIMARY KEY ("_id")
);

DROP TABLE "public"."members";


-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Table Definition
CREATE TABLE "public"."members" (
    "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "code" varchar NOT NULL,
    "name" varchar NOT NULL,
    "is_penalized" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "end_of_penalized" timestamp,
    PRIMARY KEY ("_id")
);

INSERT INTO "public"."books" ("_id","code","name","author","stock","created_at","updated_at") VALUES 
('d10fec00-4c99-4f1d-9eec-834a30541add','HOB-83','The Hobbit, or There and Back Again','J.R.R. Tolkien',1,'2024-06-08 20:57:53.13486','2024-06-08 20:57:53.13486'),
('b00767f9-34a7-4b0e-8c20-2e1d35f5bede','NRN-7','The Lion, the Witch and the Wardrobe','C.S. Lewis',1,'2024-06-08 20:58:33.077316','2024-06-08 20:58:33.077316'),
('786a1826-debc-45f1-ab8f-535ac45956a1','TW-11','Twilight','Stephenie Meyer',1,'2024-06-08 20:56:35.828833','2024-06-08 20:56:35.828833'),
('aca6ac61-5970-4fd5-a0fe-1f71f8b9eefb','JK-45','Harry Potter','J.K Rowling',1,'2024-06-08 20:54:54.617096','2024-06-08 20:54:54.617096'),
('3875620a-972c-48a4-a664-88d3d7549eac','SHR-1','A Study in Scarlet','Arthur Conan Doyle',2,'2024-06-08 20:55:35.123196','2024-06-08 20:55:35.123196');

INSERT INTO "public"."members" ("_id","code","name","is_penalized","created_at","updated_at","end_of_penalized") VALUES 
('6d98a517-eab2-4f06-bdf3-f9feedc862e1','M003','Putri','FALSE','2024-06-08 20:53:21.501472','2024-06-08 20:53:21.501472',NULL),
('c7d0eb5a-4dd5-4465-9f42-ad12814353a9','M001','Angga','FALSE','2024-06-08 20:52:51.455083','2024-06-08 20:52:51.455083',NULL),
('d17d9396-5465-49e7-b04a-f676d431661c','M002','Ferry','FALSE','2024-06-08 20:53:06.444957','2024-06-08 22:25:51.693',NULL);

