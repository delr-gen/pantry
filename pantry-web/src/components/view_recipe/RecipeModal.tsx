import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface RecipeModalProps {
    id: number
    show: boolean
    setShow: (boolean) => void
};

interface RecipeIngredient {
    ingredientId: number
    recipeId: number
    quantity: number
    unit: string
    name: string
};

interface PantryIngredient {
    ingredientId: number
    pantryIngredientId: number
    quantity: number
    unit: string
    expirationDate: Date
    dateBought: Date
    name: string
}

const initialRecipe = {
    id: null,
    name: "",
    mins: null,
    servingSize: null,
    steps: []
};

async function getRecipeIngredients(id: number) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipeingredients/${id}`, {
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

async function getRecipe(id: number) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipesteps/${id}`, {
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

async function getPantryIngredients(id: number) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipepantryingredients/${id}`, {
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

export default function RecipeModal( {id, show, setShow} : RecipeModalProps) {
    const [recipe, setRecipe] = useState(initialRecipe);
    const [ingredients, setIngredients] = useState([]);
    const [pantryIngredients, setPantryIngredients] = useState(new Set());
    const handleClose = () => setShow(false);

    useEffect( () => {
        if (id) {
            getRecipe(id)
                .then((response) => {
                    setRecipe(response)});
            getRecipeIngredients(id)
                .then((response) => {
                    //const ingredientMap = new Map<number, RecipeIngredient>(response.map((ingredient:RecipeIngredient) => [ingredient.ingredientId, ingredient]));
                    setIngredients(response);
            });
            getPantryIngredients(id)
                .then((response) => {
                    /*
                    const ingredientMap = new Map<number, PantryIngredient[]>();
                    for (const ingredient of ingredients.values()) {
                        ingredientMap.set(ingredient.ingredientId, []);
                    }
                    for (const ingredient of response) {
                        if (ingredientMap.has(ingredient.ingredientId)) {
                            ingredientMap.get(ingredient.ingredientId).push(ingredient);
                        }
                        else {
                            ingredientMap.set(ingredient.ingredientId, [ingredient]);
                        }
                    }
                        */
                    //const ingredientMap = new Map<number, PantryIngredient[]>(response.map((ingredient:PantryIngredient) => [ingredient.ingredientId, ingredient]));
                    setPantryIngredients(response)
            });
        }
    }, [id])

    return (
        <>
            <Modal className="modal" show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>{recipe.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <legend>Ingredients</legend>
                    <ul>
                    {ingredients.map(ingredient => <li key={ingredient.ingredientId} style={{color: !(ingredient.ingredientId in pantryIngredients) ?"rgb(223, 100, 100)" : "white"}}>
                        {ingredient.quantity>0? ingredient.quantity : ""} {ingredient.unit} {ingredient.name}</li>)}
                    </ul>
                </div>
                <div>
                    <legend>Steps</legend>
                    <ol>    
                        {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Exit
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )

}