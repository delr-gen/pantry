package main.java.com.pantry.my_pantry.pantry_recipes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping(value="/api")
public class PantryRecipeController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedJdbcTemplate;


    @GetMapping(value="/pantryrecipes/{offset}/{limit}")
    public List<PantryRecipe> getAllRecipes(@PathVariable Integer offset, @PathVariable Integer limit) {
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

    @GetMapping(value="/pantryrecipes")
    public List<PantryRecipe> getRecipesByName(
        @RequestParam("offset") Integer offset, 
        @RequestParam("limit") Integer limit, 
        @RequestParam(value="name", required=false, defaultValue="") String name,
        @RequestParam(value="filtered_ingredients", required=false, defaultValue="") List<Integer> filtered_ingredients) {
        /*
            Get list of recipes and missing ingredients, ordered by number of ingredients in pantry/ filter and number of missing ingredients ASC
         */
        name = "%" + name + "%";
        String query = """
            SELECT recipe_id, name, missing_ingredients, filtered_ingredients 
            FROM (
                SELECT name, recipe_id
                FROM Recipes) AS names
            %s JOIN (
                SELECT recipe_id, JSON_ARRAYAGG(name) AS filtered_ingredients 
                FROM Ingredients_In_Recipe 
                LEFT JOIN Ingredients 
                USING(ingredient_id) 
                WHERE ingredient_id IN (:filtered_ingredients)
                GROUP BY recipe_id
            ) AS filter 
            USING (recipe_id)
            LEFT JOIN (
                SELECT recipe_id, JSON_ARRAYAGG(name) AS missing_ingredients 
                FROM Ingredients_In_Recipe AS p, Ingredients AS i 
                WHERE p.ingredient_id = i.ingredient_id AND p.ingredient_id NOT IN (
                    SELECT ingredient_id 
                    FROM Pantry_Ingredients AS c 
                ) GROUP BY recipe_id 
                ORDER BY COUNT(recipe_id)
            ) AS missing 
            USING (recipe_id)
            WHERE name LIKE :name
            GROUP BY recipe_id 
            ORDER BY JSON_LENGTH(filtered_ingredients) DESC, JSON_LENGTH(missing_ingredients) ASC
            LIMIT :limit
            OFFSET :offset;
        """;
    
        if (filtered_ingredients.isEmpty()) {
            filtered_ingredients = jdbcTemplate.queryForList("SELECT ingredient_id FROM Pantry_Ingredients", Integer.class);
            query = String.format(query, "LEFT");
        }
        else {
            query = String.format(query, "RIGHT");
        }

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("name", name);
        parameters.addValue("limit", limit);
        parameters.addValue("offset", offset);
        parameters.addValue("filtered_ingredients", filtered_ingredients);

        PantryRecipeRowMapper pantryRecipeRowMapper = new PantryRecipeRowMapper();
        List<PantryRecipe> pantryRecipes = namedJdbcTemplate.query(query, parameters, pantryRecipeRowMapper);

        return pantryRecipes;
    }
}
