import { Button } from "react-bootstrap";

interface SearchRecipesFromSelectedButtonProps{
    selected: number[];
}

async function getRecipes(ingredients: number[]) {
    try {
        const params = new URLSearchParams();
        ingredients.forEach(ingredient => params.append('ingredients', ingredient.toString()))

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipeswithingredients?${params.toString()}`, {
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

export default function SearchRecipesFromSelectedButton({ selected }: SearchRecipesFromSelectedButtonProps) {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        getRecipes(selected).then((response) => console.log(response));
    }
    return (
        <>
            <Button onClick={handleClick} disabled={selected.length == 0}>Search Selected</Button>
        </>
    )
}