package main.java.com.pantry.my_pantry.recipe_ingredient;

import main.java.com.pantry.my_pantry.ingredient.Ingredient;

public class RecipeIngredient extends Ingredient{
    private int recipe_id;
    private float quantity;
    private String unit;


    public void setRecipeId(int recipe_id) {
        this.recipe_id = recipe_id;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getRecipeId() {
        return recipe_id;
    }

    public float getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }
}
