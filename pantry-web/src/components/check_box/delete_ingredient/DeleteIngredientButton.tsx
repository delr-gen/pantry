import { Button } from "react-bootstrap";

interface DeleteIngredientButtonProps {
    selected: number[],
    setSelected: (newSelected: number[]) => void
    setIngredientListIsUpdated: (isUpdated: boolean) => void
}


export default function DeleteIngredientButton( {selected, setSelected, setIngredientListIsUpdated}: DeleteIngredientButtonProps) {
    async function deleteIngredients() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/deleteingredients`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selected)
            });
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            else {
                return true;
            }
        }
        catch (error: unknown) {
            if (error instanceof Error){
                console.error(error.message);
                return false;
            }
        }   
    }

    const handleClick = () => {
        deleteIngredients().then(response => {
            if (response) {
                alert("Success");
                setSelected([]);
                setIngredientListIsUpdated(false);
            }
            else {
                alert("An error has occured");
            }
        });
    }

    return (
        <Button onClick={handleClick} disabled={selected.length == 0}>Delete {selected.length} Ingredients</Button>
    )
}