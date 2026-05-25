package main.java.com.pantry.my_pantry.pantry_ingredient;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
        String insertIngredientString = "INSERT INTO Ingredients (ingredient_id, name) SELECT NULL, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM Ingredients WHERE name=? LIMIT 1)";
        jdbcTemplate.batchUpdate(
            insertIngredientString,
            batchIngredients
        );

        String insertPantryIngredientString = "INSERT INTO Pantry_Ingredients (pantry_ingredient_id, ingredient_id, date_bought, expiration_date, quantity, unit) VALUES (NULL, (SELECT ingredient_id FROM Ingredients WHERE name=?), ?, ?, ?, ?);";
        return jdbcTemplate.batchUpdate(
            insertPantryIngredientString,
            batchPantryIngredients
        );
    }
}
