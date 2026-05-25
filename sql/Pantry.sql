DROP DATABASE IF EXISTS Pantry;
CREATE DATABASE Pantry;
USE Pantry; 

CREATE TABLE IF NOT EXISTS Ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);
  
CREATE TABLE IF NOT EXISTS Pantry_Ingredients (
  pantry_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_id INT,
  date_bought DATE,
  expiration_date DATE,
  quantity FLOAT,
  unit VARCHAR(20) DEFAULT "unit",
  FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
);

CREATE TABLE IF NOT EXISTS Recipes (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  serving_size INT,
  mins INT
); 

CREATE TABLE IF NOT EXISTS Steps_in_Recipe (
  step_id INT,
  recipe_id INT,
  instruction VARCHAR(700) NOT NULL,
  PRIMARY KEY (step_id, recipe_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);
  
CREATE TABLE IF NOT EXISTS Ingredients_in_Recipe (
  ingredient_id INT,
  recipe_id INT,
  quantity FLOAT,
  unit VARCHAR(15),
  PRIMARY KEY (ingredient_id, recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);

