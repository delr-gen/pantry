import "./PantryRecipeList.css";
import { useEffect, useState } from "react";
import LeftOffsetButton from "./LeftOffsetButton";
import RightOffsetButton from "./RightOffsetButton";
import RecipeModal from "../view_recipe/RecipeModal";
import { Link } from "react-router-dom";


async function getPantryRecipes(offset: number) {
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
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [offset, setOffset] = useState(0);

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: number) {
        e.preventDefault(); 
        setShow(true);
        setId(id);
    }

    function handlePantryRecipeChange() {
        getPantryRecipes(offset).then(
            (data) => {
                console.log(data);
                setListRecipes(data.map(recipe => 
                    <li key={recipe.id}>
                        <a href="#" onClick={(e) => {handleClick(e, recipe.id)}}>
                            {recipe.name}
                        </a>
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
            <ol>
                {listRecipes}
            </ol>
            {show && <RecipeModal
                id={id}
                show={show}
                setShow={setShow}>
            </RecipeModal>}
        </div>
    )
}
