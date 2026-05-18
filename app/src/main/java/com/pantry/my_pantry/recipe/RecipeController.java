package main.java.com.pantry.my_pantry.recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import com.google.gson.JsonArray;
//import com.google.gson.JsonObject;


@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:8080")
public class RecipeController {
    @GetMapping("/recipesearch/{name}")
    public Recipe getRecipeByName(@PathVariable String name) {
        String query = "SELECT * FROM Recipes WHERE name=?";
        RecipeRowMapper recipeRowMapper = new RecipeRowMapper();
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        Recipe recipe = jdbcTemplate.queryForObject(query, recipeRowMapper, name);

        return recipe;
    }
}

/*
// Declaring a WebServlet called RecipeSearchServlet, which maps to url "/recipesearch"
@WebServlet(name = "RecipeSearchServlet", urlPatterns = "/recipesearch")
public class RecipeSearchServlet {

    protected void doGet(HttpServletRequest request) {
        String recipe = request.getParameter("recipe");
        String query = "SELECT * FROM Recipes WHERE name=?"
        Recipe recipe = JdbcTemplate.queryForObject(query, new RecipeRowMapper(), recipe);

        JsonObject data = new JsonObject(); 
        data.addProperty("res", "success");
        
        JsonArray dataArray = new JsonArray();
        dataArray.add(data);
    }
}
*/