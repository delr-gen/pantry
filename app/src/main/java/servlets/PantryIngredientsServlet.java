package main.java.servlets;
//import org.springframework.jdbc.core.JdbcTemplate;

//jdbcTemplate.queryForObject();
import javax.naming.InitialContext;
import javax.naming.NamingException;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;import java.io.IOException;
import java.io.PrintWriter;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;


@WebServlet(name="PantryIngredientsServlet", urlPatterns="/list") 
public class PantryIngredientsServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.println("<html><body><h1>Hello, World!</h1></body></html>");
        System.out.println("Hello, World!");
    }
}