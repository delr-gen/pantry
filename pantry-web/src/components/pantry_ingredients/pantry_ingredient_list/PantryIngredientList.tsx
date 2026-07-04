import { Button } from "react-bootstrap";
import "./PantryIngredientList.css"
import { useEffect, useState } from "react";
import DeleteIngredient from "../delete_ingredient/DeleteIngredientCheckBox";

interface pantryIngredientListProps {
    ingredientListIsUpdated: boolean
    setIngredientListIsUpdated: (isUpdated: boolean) => void
    deleteList: number[]
    setDeleteList: (newDeleteList: number[]) => void
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


export default function pantryIngredientList( {ingredientListIsUpdated, setIngredientListIsUpdated, deleteList, setDeleteList}: pantryIngredientListProps) {
    const [pantryIngredients, setPantryIngredients] = useState([]);

    useEffect(() => {
        if (!ingredientListIsUpdated) {
            (getPantryIngredients().then((response) => {
                setPantryIngredients(response)
                setIngredientListIsUpdated(true);
            }))
        }
    }, [ingredientListIsUpdated])

    return (
    <div>
        <ol>
            {pantryIngredients.map(ingredient => 
                (
                    <li key={ingredient.pantryIngredientId}>
                        <div className="ingredient-item">
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                            <DeleteIngredient
                                pantryIngredientId={ingredient.pantryIngredientId}
                                deleteList={deleteList}
                                setDeleteList={setDeleteList}
                            ></DeleteIngredient>
                        </div>
                        <div className="ingredient-dates">
                            Bought on {ingredient.date_bought}
                            <br/>
                            Expires {ingredient.expiration_date}
                        </div>
                    </li>
                )
            )}
        </ol>
    </div>
    )
}
