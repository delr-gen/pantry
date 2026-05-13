package main.java.servlets;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

// Declaring a WebServlet called RecipeSearchServlet, which maps to url "/api/recipesearch"
@WebServlet(name = "RecipeSearchServlet", urlPatterns = "/api/recipesearch")
public class RecipeSearchServlet {

    
    protected void doGet() {
        JsonObject data = new JsonObject(); 
        data.addProperty("res", "success");
        
        JsonArray dataArray = new JsonArray();
        dataArray.add(data);
    }
}
