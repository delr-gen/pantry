import { useEffect, useState } from "react";

async function getPantryRecipes() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pantryrecipes`, {
            method: "GET"
        });
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        else {
            //const data = await response.json();
            //console.log(data);
            //return data;
            return response.json();
        }
    }
    catch (error: unknown) {
        if (error instanceof Error){
            console.error(error.message);
        }
    }    
}

export default function PantryRecipe() {
    const [listRecipes, setListRecipes] = useState("");
    let isMounted = true;
    useEffect(() => {
        if (isMounted) {
            getPantryRecipes().then(
                (data) => {
                    setListRecipes(data.map(recipe => <li key={recipe.id}>{recipe.name}</li>))
                });
            isMounted = false;
        }
    }, [])

    return (
        <ul>
            {listRecipes}
        </ul>
    )
}
