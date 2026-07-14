package main.java.com.pantry.my_pantry.pantry_recipes;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;


public class PantryRecipeRowMapper implements RowMapper<PantryRecipe>{
    @Override
    public PantryRecipe mapRow(ResultSet rs, int rowNum) throws SQLException {
        PantryRecipe pantryRecipe = new PantryRecipe();
        
        pantryRecipe.setId(rs.getInt("recipe_id"));
        pantryRecipe.setName(rs.getString("name"));
        pantryRecipe.setMissingIngredients(rs.getString("missing_ingredients"));
        pantryRecipe.setFilteredIngredients(rs.getString("filtered_ingredients"));

        return pantryRecipe;
    }
}
