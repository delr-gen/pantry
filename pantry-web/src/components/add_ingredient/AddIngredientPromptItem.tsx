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
    const today = new Date();
    const oneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
                placeholder="ex: cabbage, beef stock, ..."/>
            <br></br>
            Quantity: <input
                name="quantity"
                type="number"
                onChange={handleInputChange}
                defaultValue={1} />
            <br></br>
            Unit: <input
                name="unit"
                type="text"
                onChange={handleInputChange}
                defaultValue="unit"/>
            <br></br>
            Date Bought: <input
                name="date_bought"
                type="date"
                onChange={handleInputChange}
                defaultValue={today.toISOString().split('T')[0]}/>
            <br></br>
            Expiration Date: <input
                name="expiration_date"
                type="date"
                onChange={handleInputChange}
                defaultValue={oneWeek.toISOString().split('T')[0]}/>
        </div>
    )
}