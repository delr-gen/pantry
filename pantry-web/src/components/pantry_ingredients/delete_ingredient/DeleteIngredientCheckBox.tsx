import { useEffect, useState } from "react";

interface DeleteIngredientProps {
    pantryIngredientId: number
    deleteList: number[]
    setDeleteList: (newDeleteList: number[]) => void
}

export default function DeleteIngredient( {pantryIngredientId, deleteList, setDeleteList}: DeleteIngredientProps) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, i:number) => {
        setIsChecked(e.target.checked);
    };
    useEffect(() => {
        if (isChecked) {
            setDeleteList([...deleteList, pantryIngredientId]);
        }
        else {
            if (deleteList.includes(pantryIngredientId)) {
                setDeleteList(deleteList.filter((id) => id !== pantryIngredientId));
            }
        }
    }, [isChecked])
  
    return (
        <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={(e) => {handleCheckboxChange(e, pantryIngredientId)}} 
        />
    )
}