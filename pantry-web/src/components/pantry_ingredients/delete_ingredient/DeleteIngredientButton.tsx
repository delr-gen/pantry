import { Button } from "react-bootstrap";

interface DeleteIngredientButtonProps {
    deleteList: number[],
    setDeleteList: (newDeleteList: number[]) => void
    setIngredientListIsUpdated: (isUpdated: boolean) => void
}


export default function DeleteIngredientButton( {deleteList, setDeleteList, setIngredientListIsUpdated}: DeleteIngredientButtonProps) {
    async function deleteIngredients() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/deleteingredients`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteList)
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
                setDeleteList([]);
                setIngredientListIsUpdated(false);
            }
            else {
                alert("An error has occured");
            }
        });
    }

    return (
        <Button onClick={handleClick} disabled={deleteList.length == 0}>Delete {deleteList.length} Ingredients</Button>
    )
}