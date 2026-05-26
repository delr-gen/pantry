package main.java.com.pantry.my_pantry.recipe;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

public class Recipe {
    private int recipe_id;
    private String name;
    private int serving_size;
    private int mins;
    private String[] ingredients;

    public void setId(int recipe_id) {
        this.recipe_id = recipe_id;
    }

    public void setName(String recipe_name) {
        this.name = recipe_name;
    }

    public void setServingSize(int serving_size) {
        this.serving_size = serving_size;
    }

    public void setMins(int mins) {
        this.mins = mins;
    }

    public void setIngredients(String ingredients) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.ingredients = mapper.readValue(ingredients, String[].class);
        }
        catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public int getId() {
        return this.recipe_id;
    }

    public String getName() {
        return this.name;
    }

    public int getServingSize() {
        return this.serving_size;
    }

    public int getMins() {
        return this.mins;
    }

    public String[] getIngredients() {
        return this.ingredients;
    }
}
