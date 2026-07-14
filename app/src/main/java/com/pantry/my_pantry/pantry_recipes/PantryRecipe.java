package main.java.com.pantry.my_pantry.pantry_recipes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.java.com.pantry.my_pantry.recipe.Recipe;

public class PantryRecipe extends Recipe{
    private String[] missing_ingredients;
    private String[] filtered_ingredients;

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

    public void setFilteredIngredients(String filtered_ingredients) {
        if (filtered_ingredients == null) {
            this.filtered_ingredients = new String[0];
        }
        else {
            ObjectMapper mapper = new ObjectMapper();
            try {
                this.filtered_ingredients = mapper.readValue(filtered_ingredients, String[].class);
            }
            catch (JsonProcessingException e) {
                e.printStackTrace();
            }   
        }
    }

    public String[] getMissingIngredients() {
        return this.missing_ingredients;
    }

    public String[] getFilteredIngredients() {
        return this.filtered_ingredients;
    }
}
