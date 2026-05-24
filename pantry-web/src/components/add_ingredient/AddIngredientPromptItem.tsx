import "./AddIngredientPromptItem.css"

import { useState } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import AddIngredientPrompt from "./AddIngredientPrompt";

interface AddIngredientPromptItemProps {
    number: number
}

export default function AddIngredientPromptItem( {number}: AddIngredientPromptItemProps) {
    const [isClicked, setIsClicked] = useState(false);
    
    function handleAddIngredientPrompt (event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        event.preventDefault();
        setIsClicked(true);
    }

    return (
        <>
            <ListGroupItem className="add-ingredient-prompt-item">
                {isClicked && <AddIngredientPrompt number={number}/>}
            </ListGroupItem>
            {!isClicked && <Button type="submit" onClick={handleAddIngredientPrompt}>+</Button>}
            {isClicked && <AddIngredientPromptItem number={number+1}/>}
        </>
    )
}