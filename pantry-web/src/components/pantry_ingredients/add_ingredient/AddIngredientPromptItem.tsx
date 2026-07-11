import { Button } from "react-bootstrap";

interface ingredient {
    name: string,
    quantity: number,
    unit: string,
    date_bought: string,
    expiration_date: string
}

interface AddIngredientPromptProps {
    ingredients: ingredient[]
    setIngredients: (newIngredients: ingredient[]) => void,
    setIngredientListIsUpdated: (isUpdated: boolean) => void,
    i: number
};


export default function AddIngredientPromptItem( { ingredients, setIngredients, setIngredientListIsUpdated, i}: AddIngredientPromptProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let newIngredients = [...ingredients];
        newIngredients[i][name] = value;
        setIngredients(newIngredients);
    }

    const deleteIngredientPromptItem = (i: number) => {
        ingredients.splice(i, 1);
        setIngredients(ingredients);
        setIngredientListIsUpdated(false)
    }

    return (
        <>
            <div>
                Name: <input
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="ex: cabbage, beef stock, ..."
                    value={ingredients[i].name}
                    required/>
                <br></br>
                Quantity: <input
                    name="quantity"
                    type="number"
                    onChange={handleInputChange}
                    value={ingredients[i].quantity} />
                <br></br>
                Unit: <input
                    name="unit"
                    type="text"
                    onChange={handleInputChange}
                    value={ingredients[i].unit}/>
                <br></br>
                Date Bought: <input
                    name="date_bought"
                    type="date"
                    onChange={handleInputChange}
                    value={ingredients[i].date_bought}/>
                <br></br>
                Expiration Date: <input
                    name="expiration_date"
                    type="date"
                    onChange={handleInputChange}
                    value={ingredients[i].expiration_date}/>
                <br></br>
                {<Button disabled={ingredients.length == 1} onClick={() => {deleteIngredientPromptItem(i)}}>Delete</Button>}
            </div>
        </>
        
    )
}