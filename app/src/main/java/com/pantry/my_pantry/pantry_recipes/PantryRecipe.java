package main.java.com.pantry.my_pantry.pantry_recipes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.java.com.pantry.my_pantry.recipe.Recipe;

public class PantryRecipe extends Recipe{
    private String[] missing_ingredients;

    public void setMissingIngredients(String missing_ingredients) {
        if (missing_ingredients == null) {
            this.missing_ingredients = new String[0];
        }
        else {
            ObjectMapper mapper = new ObjectMapper();
            try {
                this.missing_ingredients = mapper.readValue(missing_ingredients, String[].class);
            }
            catch (JsonProcessingException e) {
                e.printStackTrace();
            }   
        }
    }

    public String[] getMissingIngredients() {
        return this.missing_ingredients;
    }
}
