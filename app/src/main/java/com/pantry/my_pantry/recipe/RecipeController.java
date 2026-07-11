package main.java.com.pantry.my_pantry.recipe;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import main.java.com.pantry.my_pantry.pantry_recipes.PantryRecipe;
import main.java.com.pantry.my_pantry.pantry_recipes.PantryRecipeRowMapper;


@RestController
@RequestMapping(value="/api")
public class RecipeController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedJdbcTemplate;

    @GetMapping(value="/recipesearch/{name}")
    public List<Recipe> getRecipeByName(@PathVariable String name) {
        name = "%" + name + "%";    
        String query = """
                SELECT recipe_id, r.name
                FROM Recipes AS r
                WHERE r.name LIKE ?
                GROUP BY recipe_id
                LIMIT 5
            """;

        RecipeRowMapper recipeRowMapper = new RecipeRowMapper();
        List<Recipe> recipes = jdbcTemplate.query(query, recipeRowMapper, name);

        return recipes;
    }

    @GetMapping("/recipesteps/{id}")
    public Recipe getPantryRecipeById(@PathVariable Integer id) {
        String query = """
                SELECT recipe_id, name, serving_size, mins, JSON_ARRAYAGG(instruction) AS steps
                FROM Recipes 
                LEFT JOIN Steps_In_Recipe USING(recipe_id) 
                WHERE recipe_id = ?
                """;

        RecipeRowMapper recipeRowMapper = new RecipeRowMapper();
        Recipe recipe = jdbcTemplate.queryForObject(query, recipeRowMapper, id);
        
        return recipe;
    }

    @GetMapping("/recipelength")
    public int getRecipeLength(@RequestParam("name") String name, @RequestParam(value="ingredients", required=false, defaultValue="") List<Integer> ingredients) {
        name = "%" + name + "%";

        String query = """
                SELECT COUNT(*) 
                FROM Recipes 
                LEFT JOIN Ingredients_In_Recipe
                USING (recipe_id)
                WHERE name LIKE (:name)
        """;

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("name", name);

        if (ingredients.size() > 0) {
            query += "AND ingredient_id IN (:selected_ingredients)";
            parameters.addValue("selected_ingredients", ingredients);
        }

        int res = namedJdbcTemplate.queryForObject(query, parameters, Integer.class);
        return res;
    }

    @GetMapping("/recipeswithingredients")
    public List<Recipe> getRecipesWithPantryIngredients(@RequestParam("ingredients") List<Integer> ingredients) {
        String query = """
                SELECT * 
                FROM Recipes 
                LEFT JOIN Ingredients_In_Recipe 
                USING (recipe_id) 
                WHERE ingredient_id IN (
                    SELECT ingredient_id
                    FROM Pantry_Ingredients
                    LEFT JOIN Ingredients
                    USING (ingredient_id)
                    WHERE pantry_ingredient_id IN (:selected_ingredients)
                );
        """;

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("selected_ingredients", ingredients);

        RecipeRowMapper recipeRowMapper = new RecipeRowMapper();
        List<Recipe> recipes = namedJdbcTemplate.query(query, parameters, recipeRowMapper);
        return recipes;
    }
}
