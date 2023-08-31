CREATE DATABASE pern_todo

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
)

CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(30)
)
