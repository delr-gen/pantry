interface DeleteIngredientProps {
    pantryIngredientId: number
    selected: number[]
    setSelected: (newDeleteList: number[]) => void
}

export default function IngredientCheckBox( {pantryIngredientId, selected, setSelected}: DeleteIngredientProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        if (e.target.checked) {
            setSelected([...selected, pantryIngredientId]);
        }
        else {
            if (selected.includes(pantryIngredientId)) {
                setSelected(selected.filter((id) => id !== pantryIngredientId));
            }
        }
    };
  
    return (
        <input 
            type="checkbox" 
            checked={selected.includes(pantryIngredientId)} 
            onChange={handleCheckboxChange} 
        />
    )
}