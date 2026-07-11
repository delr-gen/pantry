import { useState } from "react";
import AddIngredientModal from "../add_ingredient/AddIngredientModal";
import PantryIngredientList from "../pantry_ingredient_list/PantryIngredientList";
import DeleteIngredientButton from "../../check_box/delete_ingredient/DeleteIngredientButton";
import SearchRecipesFromSelectedButton from "../../check_box/search_recipes/SearchRecipesFromSelectedButton";

interface PantryIngredientContainerProps {
    ingredientListIsUpdated: boolean,
    setIngredientListIsUpdated: (isUpdated: boolean) => void;
}

export default function PantryIngredientContainer( {ingredientListIsUpdated, setIngredientListIsUpdated}: PantryIngredientContainerProps) {
    const [selected, setSelected] = useState([]);

    return (
        <div>
            Your Pantry
            <br></br>
            <AddIngredientModal
                setIngredientListIsUpdated = {setIngredientListIsUpdated}
            />
            <br></br>
            <SearchRecipesFromSelectedButton
                selected={selected}>
            </SearchRecipesFromSelectedButton>
            <DeleteIngredientButton
                selected={selected}
                setSelected={setSelected}
                setIngredientListIsUpdated={setIngredientListIsUpdated}>
            </DeleteIngredientButton>
            <PantryIngredientList
                ingredientListIsUpdated = {ingredientListIsUpdated}
                setIngredientListIsUpdated = {setIngredientListIsUpdated}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    )
}