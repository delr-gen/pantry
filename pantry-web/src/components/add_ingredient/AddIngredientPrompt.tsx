interface AddIngredientPromptProps {
    number: number
}

export default function AddIngredientPrompt({ number }: AddIngredientPromptProps) {
    const name = `name_${number}`;
    const quantity = `quantity_${number}`;
    const unit = `unit_${number}`;
    const date_bought = `date_bought_${number}`;
    const expiration_date = `expiration_date_${number}`;

    return (
        <>
            <label htmlFor={name}>Ingredient Name: </label>
            <input type="text" id={name} name="name"/>
            <br></br>
            <label htmlFor={quantity}>Quantity: </label>
            <input type="text" id={quantity} name="quantity"/>
            <br></br>
            <label htmlFor={unit}>Unit: </label>
            <input type="text" id={unit} name="unit"/>
            <br></br>
            <label htmlFor={date_bought}>Date Bought: </label>
            <input type="date" id={date_bought} name="date_bought"/>
            <br></br>
            <label htmlFor={expiration_date}>Expiration Date: </label>
            <input type="date" id={expiration_date} name="expiration_date"/>
            <br></br>
        </>
    )
}