import { Button } from "react-bootstrap";

interface SearchRecipesFromSelectedButtonProps{
    selected: number[];
    setFilter: (selected: number[]) => void;
}

async function getRecipes(ingredients: number[]) {
    try {
        const params = new URLSearchParams();
        ingredients.forEach(ingredient => params.append('pantryIngredientIds', ingredient.toString()))

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredientids?${params.toString()}`, {
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

export default function SearchRecipesFromSelectedButton({ selected, setFilter }: SearchRecipesFromSelectedButtonProps) {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        getRecipes(selected).then((response) => {
            setFilter(response);
        });
    }
    return (
        <>
            <Button onClick={handleClick} disabled={selected.length == 0}>Filter</Button>
        </>
    )
}