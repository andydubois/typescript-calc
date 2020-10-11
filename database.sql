Create database named "sezzle_calc"

CREATE TABLE "equations"
(
    "id" SERIAL NOT NULL,
    "equation" VARCHAR (200) NOT NULL,
    "result" INTEGER (200) NOT NULL
);