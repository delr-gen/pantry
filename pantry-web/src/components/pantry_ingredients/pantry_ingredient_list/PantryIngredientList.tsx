import "./PantryIngredientList.css"
import { useEffect, useRef, useState } from "react";
import DeleteIngredient from "../delete_ingredient/DeleteIngredientCheckBox";


interface pantryIngredientListProps {
    ingredientListIsUpdated: boolean
    setIngredientListIsUpdated: (isUpdated: boolean) => void
    deleteList: number[]
    setDeleteList: (newDeleteList: number[]) => void
}

async function getPantryIngredients(query: string) {
    try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/searchpantry`);
        const params = {"name": query};
        url.search = new URLSearchParams(params).toString();
        const response = await fetch(url, {
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
    const [ingredientQuery, setIngredientQuery] = useState("");
    const didMount = useRef(false);

    useEffect(() => {
        if (!ingredientListIsUpdated) {
            if (ingredientQuery === "") {
                getPantryIngredients(ingredientQuery).then((response) => {
                    setPantryIngredients(response)
                    setIngredientListIsUpdated(true);
                })
            }
            else {
                setIngredientQuery("");
            }
           setIngredientListIsUpdated(true);
        }
    }, [ingredientListIsUpdated])

    useEffect(() => {
            if (didMount.current) {
                const timeOutId = setTimeout(() => {
                    getPantryIngredients(ingredientQuery).then((response) => {
                            setPantryIngredients(response)
                        })    
                    }, 
                500);
                return () => clearTimeout(timeOutId);
    
            }
            else {
                didMount.current = true;
            }
        }
    , [ingredientQuery]);

    return (
    <div>
        <input 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIngredientQuery(event.target.value)}
                placeholder="Search Your Pantry"
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                    }
                }} 
                value={ingredientQuery}
            >
            </input>
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
