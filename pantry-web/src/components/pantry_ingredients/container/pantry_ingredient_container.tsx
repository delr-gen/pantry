import { useState } from "react";
import AddIngredientModal from "../add_ingredient/AddIngredientModal";
import PantryIngredientList from "../pantry_ingredient_list/PantryIngredientList";
import DeleteIngredientButton from "../delete_ingredient/DeleteIngredientButton";

export default function PantryIngredientContainer() {
    const [ingredientListIsUpdated, setIngredientListIsUpdated] = useState(false);
    const [deleteList, setDeleteList] = useState([]);

    return (
        <div>
            Your Pantry
            <br></br>
            <AddIngredientModal
                setIngredientListIsUpdated = {setIngredientListIsUpdated}
            />
            <br></br>
            <DeleteIngredientButton
                deleteList={deleteList}
                setDeleteList={setDeleteList}
                setIngredientListIsUpdated={setIngredientListIsUpdated}>
            </DeleteIngredientButton>
            <PantryIngredientList
                ingredientListIsUpdated = {ingredientListIsUpdated}
                setIngredientListIsUpdated = {setIngredientListIsUpdated}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
            />
        </div>
    )
}