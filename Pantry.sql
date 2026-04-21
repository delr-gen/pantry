CREATE DATABASE IF NOT EXISTS Pantry;
USE Pantry; 

CREATE TABLE IF NOT EXISTS Ingredients (
  ingredient_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
  
CREATE TABLE IF NOT EXISTS Pantry_Ingredients (
  pantry_ingredient_id INT PRIMARY KEY,
  date_bought DATE DEFAULT CUR_DATE(),
  expiration_date DATE,
  quantity FLOAT,
  unit VARCHAR(20) DEFAULT "unit",
  FOREIGN KEY (pantry_ingredient_id) REFERENCES Ingredient(ingredient_id)
);

CREATE TABLE IF NOT EXISTS Recipe (
  recipe_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  serving_size INT,
  mins INT
); 

CREATE TABLE IF NOT EXISTS Steps_in_Recipe (
  step_id INT,
  recipe_id INT,
  instruction VARCHAR(300) NOT NULL,
  PRIMARY KEY (step_id, recipe_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);
  
CREATE TABLE IF NOT EXISTS Ingredients_in_Recipe (
  ingredient_id INT,
  recipe_id INT,
  quantity FLOAT,
  unit VARCHAR(15),
  PRIMARY KEY (ingredient_id, recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);

