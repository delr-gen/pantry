package main.java.com.pantry.my_pantry.pantry_ingredient;

import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api")
public class PantryIngredientController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/add_pantry_ingredient/{name}/{date_bought}/{expiration_date}/{quantity}/{unit}")
    public PantryIngredient addPantryIngredient(
            @PathVariable String name,
            @PathVariable LocalDate date_bought,
            @PathVariable LocalDate expiration_date,
            @PathVariable float quantity,
            @PathVariable String unit) {
        return new PantryIngredient();
    }
}
