package main.java.com.pantry.my_pantry.pantry_ingredient;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import main.java.com.pantry.my_pantry.ingredient.Ingredient;

public class PantryIngredient extends Ingredient{
    private int pantry_ingredient_id;
    private int ingredient_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date_bought;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate expiration_date;
    private float quantity;
    private String unit = "unit";

    public void setPantryIngredientId(int id) {
        this.pantry_ingredient_id = id;
    }

    public void setIngredientId(int id) {
        this.ingredient_id = id;
    }

    public void setDateBought(LocalDate date) {
        this.date_bought = date;
    }

    public void setExpirationDate(LocalDate expiration_date) {
        this.expiration_date = expiration_date;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getPantryIngredientId() {
        return pantry_ingredient_id;
    }

    public int getIngredientId() {
        return ingredient_id;
    }

    public LocalDate getDateBought() {
        return date_bought;
    }

    public LocalDate getExpirationDate() {
        return expiration_date;
    }

    public float getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }
}
