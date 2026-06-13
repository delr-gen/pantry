import "./PantryRecipeList.css";
import { useEffect, useState } from "react";
import LeftOffsetButton from "./LeftOffsetButton";
import RightOffsetButton from "./RightOffsetButton";
import RecipeModal from "../view_recipe/RecipeModal";


async function getPantryRecipes(offset: number, limit: number) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pantryrecipes/${offset}/${limit}`, {
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


async function getRecipeLength() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipelength`, {
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
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [recipeLength, setRecipeLength] = useState(0);


    function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: number) {
        e.preventDefault(); 
        setShow(true);
        setId(id);
    }

    function handlePantryRecipeChange() {
        getPantryRecipes(offset, limit).then(
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

    useEffect(() => {
            getRecipeLength().then(response => setRecipeLength(response));
    })

    return (
        <div>
            <legend>Recipes</legend>
            <LeftOffsetButton
                currOffset = {offset}
                setOffset = {setOffset}
                currPage = {page}
                setPage = {setPage}
                limit = {limit}
            ></LeftOffsetButton>
            <RightOffsetButton
                currOffset = {offset}
                setOffset = {setOffset}
                currPage = {page}
                setPage = {setPage}
                limit = {limit}
                maxLen = {recipeLength}
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
