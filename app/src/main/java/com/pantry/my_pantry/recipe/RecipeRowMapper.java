package main.java.com.pantry.my_pantry.recipe;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class RecipeRowMapper implements RowMapper<Recipe>{
    @Override
    public Recipe mapRow(ResultSet rs, int rowNum) throws SQLException {
        Recipe recipe = new Recipe();
        
        recipe.setId(rs.getInt("recipe_id"));
        recipe.setName(rs.getString("name"));
        recipe.setServingSize(rs.getInt("serving_size"));
        recipe.setMins(rs.getInt("mins"));
        recipe.setIngredients(rs.getString("ingredients"));

        return recipe;
    }
}
