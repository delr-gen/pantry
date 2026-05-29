async function getRecipe(id: Number) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipebyid/${id}`, {
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

export default function RecipeModal() {

}