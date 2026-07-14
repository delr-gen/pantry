import "./PantryRecipeList.css";
import React, { useEffect, useState } from "react";
import LeftOffsetButton from "./LeftOffsetButton";
import RightOffsetButton from "./RightOffsetButton";
import RecipeModal from "../view_recipe/RecipeModal";
import SearchRecipesFromSelectedButton from "../check_box/search_recipes/SearchRecipesFromSelectedButton";

interface PantryRecipeListProps {
    ingredientListIsUpdated: boolean;
    selected: number[];
    setSelected: (selected: number[]) => void;
    setIngredientListIsUpdated: (isUpdated: boolean) => void;
}

async function getPantryRecipes(offset: number, limit: number, query: string, selected: number[]) {
    let response = null;
    try {
        const params = {
            offset: offset.toString(),
            limit: limit.toString(),
            name: query,
            filtered_ingredients: selected.toString()
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


async function getRecipeLength(query: string, selected: number[]) {
    try {
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/recipelength`);
        const params = {"name": query, "ingredients": selected.toString()};
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


export default function PantryRecipeList( {ingredientListIsUpdated, setIngredientListIsUpdated, selected}: PantryRecipeListProps) {
    const [listRecipes, setListRecipes] = useState("");
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [recipeLength, setRecipeLength] = useState(0);
    const [recipeQuery, setRecipeQuery] = useState("");
    const [filter, setFilter] = useState([]);

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
                {
                    filter.length == 0 && recipe.filteredIngredients.length > 0 && 
                    <div>In Your Pantry: {recipe.filteredIngredients.join(", ")}</div>
                }
                {
                    filter.length > 0 &&
                    <div>Includes: {recipe.filteredIngredients.join(", ")}</div>
                }
            </li>
        ))
    }

    function handlePantryRecipeChange() {
        getPantryRecipes(offset, limit, recipeQuery, filter).then(
            (data) => {
                handleRecipeListChange(data);      
            });
        getRecipeLength(recipeQuery, filter).then(
            (data) => {
                setRecipeLength(data);
            }
        )
    }

    useEffect(() => {
            handlePantryRecipeChange();
    }, [offset, ingredientListIsUpdated])

    useEffect(() => {
            getRecipeLength(recipeQuery, filter).then(response => setRecipeLength(response));
    })

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (offset != 0) {
                setOffset(0);
                setPage(1);
            }
            else {
                setIngredientListIsUpdated(false);
            }
        }
        , 500);
        return () => clearTimeout(timeOutId);
    }, [recipeQuery, filter])


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
            <SearchRecipesFromSelectedButton
                selected = {selected}
                setFilter= {setFilter}>
            </SearchRecipesFromSelectedButton>
            <br></br>
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
