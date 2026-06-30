import "./PantryIngredientList.css"
import { useEffect, useState } from "react";

interface PantryIngredient {
    ingredientId: number
    pantryIngredientId: number
    quantity: number
    unit: string
    expirationDate: Date
    dateBought: Date
    name: string
}

async function getPantryIngredients() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pantryingredients`, {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        else {
            return response.json();
        }
    }
    catch (error: unknown) {
        if (error instanceof Error){
            console.error(error.message);
        }
    }   
}


export default function pantryIngredientList() {
    const [pantryIngredients, setPantryIngredients] = useState([]);

    useEffect(() => {
        (getPantryIngredients().then((response) => {
            setPantryIngredients(response)
        }))
    }, [])

    return (
        <ol>
            {pantryIngredients.map(ingredient => (
                <li>
                    <div className="ingredient-item">{ingredient.quantity} {ingredient.unit} {ingredient.name}</div>
                    <div className="ingredient-dates">
                        Bought on {ingredient.date_bought}
                        <br/>
                        Expires {ingredient.expiration_date}
                    </div>
                </li>
            ))}
        </ol>
    )
}
