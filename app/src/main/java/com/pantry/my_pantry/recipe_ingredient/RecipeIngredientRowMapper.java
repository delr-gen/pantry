package main.java.com.pantry.my_pantry.recipe_ingredient;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;


public class RecipeIngredientRowMapper implements RowMapper<RecipeIngredient>{
    @Override
    public RecipeIngredient mapRow(ResultSet rs, int rowNum) throws SQLException{
        RecipeIngredient recipeIngredient = new RecipeIngredient();

        recipeIngredient.setIngredientId(rs.getInt("ingredient_id"));
        recipeIngredient.setRecipeId(rs.getInt("recipe_id"));
        recipeIngredient.setQuantity(rs.getFloat("quantity"));
        recipeIngredient.setUnit(rs.getString("unit"));
        recipeIngredient.setName(rs.getString("name"));

        return recipeIngredient;
    }
}
