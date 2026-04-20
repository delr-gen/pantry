CREATE DATABASE IF NOT EXISTS Pantry;
USE Pantry; 

CREATE TABLE IF NOT EXISTS Ingredients (
  ingredient_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
  
CREATE TABLE IF NOT EXISTS Pantry_Ingredients (
  pantry_ingredient_id INT PRIMARY KEY,
  date_bought DATE,
  expiration_date DATE,
  quantity FLOAT NOT NULL,
  unit INT NOT NULL,
  FOREIGN KEY (pantry_ingredient_id) REFERENCES Ingredient(ingredient_id)
);

CREATE TABLE IF NOT EXISTS Recipe (
  recipe_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  serving_size INT NOT NULL
); 

CREATE TABLE IF NOT EXISTS Steps_in_Recipe (
  step_id INT PRIMARY KEY,
  recipe_id INT NOT NULL,
  instruction VARCHAR(300) NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);
  
CREATE TABLE IF NOT EXISTS Ingredients_in_Recipe (
  ingredient_id INT NOT NULL,
  recipe_id INT NOT NULL,
  quantity FLOAT,
  unit VARCHAR(15),
  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);

