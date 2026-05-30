package main.java.com.pantry.my_pantry.recipe_ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import main.java.com.pantry.my_pantry.recipe_ingredient.RecipeIngredientRowMapper;

@RestController
@RequestMapping(value="/api")
public class RecipeIngredientController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/recipeingredients/{id}")
    public List<RecipeIngredient> getIngredientsInRecipe(@PathVariable Integer id) {
        String query = """
                SELECT *
                FROM Ingredients_In_Recipe
                LEFT JOIN Ingredients USING (ingredient_id)
                WHERE recipe_id = ?
                """;
        RecipeIngredientRowMapper recipeIngredientRowMapper = new RecipeIngredientRowMapper();
        List<RecipeIngredient> ingredients = jdbcTemplate.query(query, recipeIngredientRowMapper, id);

        return ingredients;
    }
}
