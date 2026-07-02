interface ingredient {
    name: string,
    quantity: number,
    unit: string,
    date_bought: string,
    expiration_date: string
}

interface AddIngredientPromptProps {
    ingredients: ingredient[]
    setIngredients: (newIngredients: ingredient[]) => void
    i: number
};


export default function AddIngredientPromptItem( { ingredients, setIngredients, i}: AddIngredientPromptProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let newIngredients = [...ingredients];
        newIngredients[i][name] = value;
        setIngredients(newIngredients);
    }

    return (
        <div>
            Name: <input
                name="name"
                type="text"
                onChange={handleInputChange}
                placeholder="ex: cabbage, beef stock, ..."
                defaultValue={ingredients[i].name}/>
            <br></br>
            Quantity: <input
                name="quantity"
                type="number"
                onChange={handleInputChange}
                defaultValue={ingredients[i].quantity} />
            <br></br>
            Unit: <input
                name="unit"
                type="text"
                onChange={handleInputChange}
                defaultValue={ingredients[i].unit}/>
            <br></br>
            Date Bought: <input
                name="date_bought"
                type="date"
                onChange={handleInputChange}
                defaultValue={ingredients[i].date_bought}/>
            <br></br>
            Expiration Date: <input
                name="expiration_date"
                type="date"
                onChange={handleInputChange}
                defaultValue={ingredients[i].expiration_date}/>
        </div>
    )
}