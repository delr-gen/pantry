package main.java.com.pantry.my_pantry.recipe;

public class Recipe {
    private int recipe_id;
    private String recipe_name;
    private int serving_size;
    private int mins;

    public void setId(int recipe_id) {
        this.recipe_id = recipe_id;
    }

    public void setName(String recipe_name) {
        this.recipe_name = recipe_name;
    }

    public void setServingSize(int serving_size) {
        this.serving_size = serving_size;
    }

    public void setMins(int mins) {
        this.mins = mins;
    }

    public int getId() {
        return this.recipe_id;
    }

    public String getName() {
        return this.recipe_name;
    }

    public int getServingSize() {
        return this.serving_size;
    }

    public int getMins() {
        return this.mins;
    }
}
