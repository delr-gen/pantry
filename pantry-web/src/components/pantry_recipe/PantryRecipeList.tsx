import "./PantryRecipeList.css";
import { useEffect, useState } from "react";
import LeftOffsetButton from "./LeftOffsetButton";
import RightOffsetButton from "./RightOffsetButton";


async function getPantryRecipes(offset: Number) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pantryrecipes/${offset}`, {
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


export default function PantryRecipeList() {
    const [listRecipes, setListRecipes] = useState("");
    const [offset, setOffset] = useState(0);

    function handlePantryRecipeChange() {
        getPantryRecipes(offset).then(
            (data) => {
                console.log(data);
                setListRecipes(data.map(recipe => 
                    <li key={recipe.id}>{recipe.name}
                        {
                            recipe.missingIngredients.length > 0 && 
                            <div className="missing-ingredient">
                                Missing {recipe.missingIngredients.length} Ingredients: {recipe.missingIngredients.join(", ")}
                            </div>
                        }
                    </li>
                ))
            });
    }

    useEffect(() => {
            handlePantryRecipeChange();
    }, [offset])

    return (
        <div>
            <legend>Recipes</legend>
            <LeftOffsetButton
                currOffset = {offset}
                setOffset = {setOffset}
            ></LeftOffsetButton>
            <RightOffsetButton
                currOffset = {offset}
                setOffset = {setOffset}
            ></RightOffsetButton>
            <ul>
                {listRecipes}
            </ul>
        </div>
    )
}
