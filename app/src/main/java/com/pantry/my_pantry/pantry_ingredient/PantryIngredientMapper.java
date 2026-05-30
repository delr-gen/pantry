package main.java.com.pantry.my_pantry.pantry_ingredient;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.jdbc.core.RowMapper;


public class PantryIngredientMapper implements RowMapper<PantryIngredient>{
    @Override
    public PantryIngredient mapRow(ResultSet rs, int rowNum) throws SQLException {
        PantryIngredient pantryIngredient = new PantryIngredient();
        
        pantryIngredient.setIngredientId(rs.getInt("ingredient_id"));
        pantryIngredient.setPantryIngredientId(rs.getInt("pantry_ingredient_id"));
        pantryIngredient.setName(rs.getString("name"));
        pantryIngredient.setDateBought(rs.getDate("date_bought")!=null ? rs.getDate("date_bought").toLocalDate() : null);
        pantryIngredient.setExpirationDate(rs.getDate("expiration_date")!=null ? rs.getDate("expiration_date").toLocalDate() : null);
        pantryIngredient.setQuantity(rs.getFloat("quantity"));
        pantryIngredient.setUnit(rs.getString("unit"));

        return pantryIngredient;
    }
}
