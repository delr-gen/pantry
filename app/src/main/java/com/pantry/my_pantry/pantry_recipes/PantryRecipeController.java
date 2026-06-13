package main.java.com.pantry.my_pantry.pantry_recipes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping(value="/api")
public class PantryRecipeController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping(value="/pantryrecipes/{offset}/{limit}")
    public List<PantryRecipe> getRecipesByPantryIngredients(@PathVariable Integer offset, @PathVariable Integer limit) {
        /*
            Get list of recipes and missing ingredients, ordered by number of missing ingredients
         */
        String query = """
            SELECT recipe_id, name, missing_ingredients 
            FROM Recipes 
            LEFT JOIN (
                SELECT recipe_id, JSON_ARRAYAGG(i.name) AS missing_ingredients 
                FROM Ingredients_In_Recipe AS p, Ingredients AS i 
                WHERE p.ingredient_id = i.ingredient_id AND p.ingredient_id NOT IN (
                    SELECT ingredient_id FROM Pantry_Ingredients AS c 
                ) GROUP BY recipe_id 
                ORDER BY COUNT(recipe_id)
            ) AS r 
            USING (recipe_id) 
            GROUP BY recipe_id 
            ORDER BY JSON_LENGTH(missing_ingredients)
            LIMIT ?
            OFFSET ?;
        """;

        PantryRecipeRowMapper pantryRecipeRowMapper = new PantryRecipeRowMapper();
        List<PantryRecipe> pantryRecipes = jdbcTemplate.query(query, pantryRecipeRowMapper, limit, offset);

        return pantryRecipes;
    }
}
