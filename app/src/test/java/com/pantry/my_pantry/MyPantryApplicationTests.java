package com.pantry.my_pantry;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@SpringBootTest
class MyPantryApplicationTests {

	//@Autowired
    //private TestRestTemplate restTemplate;

	@Test
	void contextLoads() {
	}
/*
	@Test
	void testGetRecipe() {
		HttpEntity<String> entity = new HttpEntity<>(headers);
		ResponseEntity<String> response = restTemplate.exchange(
                "http://localhost:8080/api/recipesearch/When%20Steak%20Met%20Potatoes",
                HttpMethod.GET,
                entity,
                String.class
        );
		System.out.println(response);
	}
*/
}
