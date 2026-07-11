import "./PantryIngredientList.css"
import { useEffect, useRef, useState } from "react";
import IngredientCheckBox from "../../check_box/IngredientCheckBox";


interface pantryIngredientListProps {
    ingredientListIsUpdated: boolean
    setIngredientListIsUpdated: (isUpdated: boolean) => void
    selected: number[]
    setSelected: (newSelected: number[]) => void
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


export default function pantryIngredientList( {ingredientListIsUpdated, setIngredientListIsUpdated, selected, setSelected}: pantryIngredientListProps) {
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

    const today = new Date().toISOString().split('T')[0];
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
                            <IngredientCheckBox
                                pantryIngredientId={ingredient.pantryIngredientId}
                                selected={selected}
                                setSelected={setSelected}
                            ></IngredientCheckBox>
                        </div>
                        <div className="ingredient-dates">
                            Bought on {ingredient.date_bought}
                            <br></br>
                            {ingredient.expiration_date >= today && <div>Expires {ingredient.expiration_date}</div>}
                            {ingredient.expiration_date < today && <div className="expired">Expired on {ingredient.expiration_date}</div>}
                        </div>
                    </li>
                )
            )}
        </ol>
    </div>
    )
}
