DROP DATABASE project;
CREATE DATABASE project;
USE project;

CREATE TABLE users (
    `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)