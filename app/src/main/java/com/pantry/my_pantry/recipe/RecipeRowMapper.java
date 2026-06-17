package main.java.com.pantry.my_pantry.recipe;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;

import org.springframework.jdbc.core.RowMapper;

public class RecipeRowMapper implements RowMapper<Recipe>{
    @Override
    public Recipe mapRow(ResultSet rs, int rowNum) throws SQLException {
        Recipe recipe = new Recipe();
        
        recipe.setId(rs.getInt("recipe_id"));
        recipe.setName(rs.getString("name"));
        try {
            recipe.setServingSize(rs.getInt("serving_size"));
        }
        catch (SQLSyntaxErrorException sqlSyntaxErrorException) {
            System.out.println("Serving size not requested");
        }
        try {
            recipe.setMins(rs.getInt("mins"));
        }
        catch (SQLSyntaxErrorException sqlSyntaxErrorException) {
            System.out.println("Minutes not requested");
        }
        try {
            recipe.setIngredients(rs.getString("ingredients"));
        }
        catch (SQLSyntaxErrorException sqlSyntaxErrorException) {
            System.out.println("Ingredients not requested");
        }
        try {
            recipe.setSteps(rs.getString("steps"));
        }
        catch (SQLSyntaxErrorException sqlSyntaxErrorException) {
            System.out.println("Steps not requested");
        }

        return recipe;
    }
}
