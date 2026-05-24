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
        String query = "SELECT * FROM Recipes WHERE name=?";
        RecipeRowMapper recipeRowMapper = new RecipeRowMapper();
        Recipe recipe = jdbcTemplate.queryForObject(query, recipeRowMapper, name);

        return recipe;
    }
}
