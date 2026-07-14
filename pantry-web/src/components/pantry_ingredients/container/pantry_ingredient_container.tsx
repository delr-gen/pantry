import AddIngredientModal from "../add_ingredient/AddIngredientModal";
import PantryIngredientList from "../pantry_ingredient_list/PantryIngredientList";
import DeleteIngredientButton from "../../check_box/delete_ingredient/DeleteIngredientButton";

interface PantryIngredientContainerProps {
    ingredientListIsUpdated: boolean,
    setIngredientListIsUpdated: (isUpdated: boolean) => void;
    selected: number[],
    setSelected: (selected: number[]) => void
}

export default function PantryIngredientContainer( {ingredientListIsUpdated, setIngredientListIsUpdated, selected, setSelected}: PantryIngredientContainerProps) {

    return (
        <div>
            Your Pantry
            <br></br>
            <AddIngredientModal
                setIngredientListIsUpdated = {setIngredientListIsUpdated}>
            </AddIngredientModal>
            <br></br>
            <DeleteIngredientButton
                selected={selected}
                setSelected={setSelected}
                setIngredientListIsUpdated={setIngredientListIsUpdated}>
            </DeleteIngredientButton>
            <PantryIngredientList
                ingredientListIsUpdated = {ingredientListIsUpdated}
                setIngredientListIsUpdated = {setIngredientListIsUpdated}
                selected={selected}
                setSelected={setSelected}>
            </PantryIngredientList>
        </div>
    )
}