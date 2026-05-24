package main.java.com.pantry.my_pantry.ingredient;

public class Ingredient {
    private int ingredient_id;
    private String name;

    public void setIngredientId(int id) {
        this.ingredient_id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIngredientId(){
        return this.ingredient_id;
    }

    public String getName(){
        return this.name;
    }
}
