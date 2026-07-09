package main.java.com.pantry.my_pantry.pantry_ingredient;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value="/api")
public class PantryIngredientController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    @PostMapping(value="/add_pantry_ingredients")
    public int[] addPantryIngredients(@RequestBody List<PantryIngredient> ingredients) {
        List<Object[]> batchPantryIngredients = new ArrayList<>();
        List<Object[]> batchIngredients = new ArrayList<>();
        for (PantryIngredient pantryIngredient: ingredients) {
            Object[] ingredientObject = new Object[] {
                pantryIngredient.getName(),
                pantryIngredient.getName()
            };
            Object[] pantryIngredientObject = new Object[] {
                pantryIngredient.getName(),
                pantryIngredient.getDateBought(),
                pantryIngredient.getExpirationDate(),
                pantryIngredient.getQuantity(),
                pantryIngredient.getUnit()
            };
            batchIngredients.add(ingredientObject);
            batchPantryIngredients.add(pantryIngredientObject);
        }

        // insert ingredient into ingredients if not exists
        String insertIngredientString = """
            INSERT INTO Ingredients (name) 
            SELECT ? 
            FROM DUAL 
            WHERE NOT EXISTS (
                SELECT 1 
                FROM Ingredients 
                WHERE name=?)
            """;
        jdbcTemplate.batchUpdate(
            insertIngredientString,
            batchIngredients
        );

        String insertPantryIngredientString = """
            INSERT INTO Pantry_Ingredients (pantry_ingredient_id, ingredient_id, date_bought, expiration_date, quantity, unit) 
            VALUES (NULL, (
                SELECT ingredient_id 
                FROM Ingredients 
                WHERE name=?),
            ?, ?, ?, ?);
            """;
        return jdbcTemplate.batchUpdate(
            insertPantryIngredientString,
            batchPantryIngredients
        );
    }

    // get current and missing ingredients from recipe id based on pantry ingredients
    @GetMapping("/recipepantryingredients/{id}")
    public List<PantryIngredient> getPantryIngredientsForRecipe(@PathVariable Integer id) {
        String query = """
                SELECT name, pi.* 
                FROM Ingredients_In_Recipe
                LEFT JOIN Pantry_Ingredients AS pi USING (ingredient_id) 
                LEFT JOIN Ingredients USING (ingredient_id)
                WHERE recipe_id = ?
                """;

        PantryIngredientMapper pantryIngredientMapper = new PantryIngredientMapper();
        List<PantryIngredient> pantryIngredients = jdbcTemplate.query(query, pantryIngredientMapper, id);

        return pantryIngredients;
    }


    @GetMapping("/expiredpantryingredientsforrecipe/{id}")
    public List<PantryIngredient> getExpiredPantryIngredientsForRecipe(@PathVariable Integer id) {
        /*
            Get expired ingredients for recipe
        */
        String query ="""
                SELECT * 
                FROM Pantry_Ingredients 
                WHERE expiration_date < CURRENT_DATE 
                AND ingredient_id IN (
                    SELECT ingredient_id 
                    FROM Recipes 
                    WHERE recipe_id = ?
                );
        """;

        PantryIngredientMapper pantryIngredientMapper = new PantryIngredientMapper();
        List<PantryIngredient> pantryIngredients = jdbcTemplate.query(query, pantryIngredientMapper, id);

        return pantryIngredients;
    }

    @GetMapping("/pantryingredients")
    public List<PantryIngredient> getPantryIngredients() {
        String query = """
                SELECT *
                FROM Pantry_Ingredients
                LEFT JOIN Ingredients
                USING (ingredient_id)
                ORDER BY name
                """;

        PantryIngredientMapper pantryIngredientMapper = new PantryIngredientMapper();
        List<PantryIngredient> pantryIngredients = jdbcTemplate.query(query, pantryIngredientMapper);

        return pantryIngredients;
    }

    @PostMapping("/deleteingredients")
    public int[] deletePantryIngredients(@RequestBody List<Integer> pantryIngedientIds) {
        String deleteString = "DELETE FROM Pantry_Ingredients WHERE pantry_ingredient_id = ?";

        List<Object[]> batchArgs = new ArrayList<>();
        for (Integer id : pantryIngedientIds) {
            batchArgs.add(new Object[] { id });
        }

        return jdbcTemplate.batchUpdate(deleteString, batchArgs);
    }

    @GetMapping("/searchpantry")
    public List<PantryIngredient> searchPantryIngredients(@RequestParam("name") String name) {
        name = "%" + name + "%";
        String query = """
                SELECT *
                FROM Pantry_Ingredients
                LEFT JOIN Ingredients
                USING (ingredient_id)
                WHERE name LIKE ?
                ORDER BY name ASC, expiration_date ASC
        """;

        PantryIngredientMapper pantryIngredientMapper = new PantryIngredientMapper();
        List<PantryIngredient> pantryIngredients = jdbcTemplate.query(query, pantryIngredientMapper, name);

        return pantryIngredients;
    }
}
