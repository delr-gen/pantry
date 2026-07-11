import "./PantryRecipeList.css";
import React, { useEffect, useState } from "react";
import LeftOffsetButton from "./LeftOffsetButton";
import RightOffsetButton from "./RightOffsetButton";
import RecipeModal from "../view_recipe/RecipeModal";

interface PantryRecipeListProps {
    ingredientListIsUpdated: boolean;
}

async function getPantryRecipes(offset: number, limit: number, query: string) {
    let response = null;
    try {
        const params = {
            offset: offset.toString(),
            limit: limit.toString(),
            name: query
        };
        const paramString = new URLSearchParams(params).toString();
        
        response = await fetch(`${import.meta.env.VITE_API_URL}/api/pantryrecipes?${paramString}`, {
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


async function getRecipeLength(query: string) {
    try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/recipelength`);
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


export default function PantryRecipeList( {ingredientListIsUpdated}: PantryRecipeListProps) {
    const [listRecipes, setListRecipes] = useState("");
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [recipeLength, setRecipeLength] = useState(0);
    const [recipeQuery, setRecipeQuery] = useState("");


    function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: number) {
        e.preventDefault(); 
        setShow(true);
        setId(id);
    }

    function handleRecipeListChange(data) {
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
    }

    function handlePantryRecipeChange() {
        getPantryRecipes(offset, limit, recipeQuery).then(
            (data) => {
                handleRecipeListChange(data);      
            });
        getRecipeLength(recipeQuery).then(
            (data) => {
                setRecipeLength(data);
            }
        )
    }

    useEffect(() => {
            handlePantryRecipeChange();
    }, [offset, ingredientListIsUpdated])

    useEffect(() => {
            getRecipeLength(recipeQuery).then(response => setRecipeLength(response));
    })

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (offset != 0) {
                setOffset(0);
                setPage(1);
            }
            else {
                handlePantryRecipeChange();
            }
        }
        , 500);
        return () => clearTimeout(timeOutId);
    }, [recipeQuery])


    return (
        <div>
            <legend>Recipes</legend>
            <form>
                <input
                    name="recipequery"
                    type="text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRecipeQuery(event.target.value)}
                    placeholder="Search Recipe Names"
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                        }
                    }} 
                >
                </input>
            </form>
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
            <ol className = "pantry-recipe-list">
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
