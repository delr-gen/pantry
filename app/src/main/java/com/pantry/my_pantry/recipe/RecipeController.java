package main.java.com.pantry.my_pantry.recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value="/api")
public class RecipeController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping(value="/recipesearch/{name}")
    public Recipe getRecipeByName(@PathVariable String name) {
        // TODO: return nothing when recipe not found
        name = "%" + name + "%";    
        String query = """
                SELECT recipe_id, r.name
                FROM Recipes AS r
                WHERE r.name LIKE ?
                GROUP BY recipe_id
            """;

        RecipeRowMapper recipeRowMapper = new RecipeRowMapper();
        Recipe recipe = jdbcTemplate.queryForObject(query, recipeRowMapper, name);

        return recipe;
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
    public int getRecipeLength() {
        String query = "SELECT COUNT(*) FROM Recipes";

        int res = jdbcTemplate.queryForObject(query, Integer.class);

        return res;
    }
}
