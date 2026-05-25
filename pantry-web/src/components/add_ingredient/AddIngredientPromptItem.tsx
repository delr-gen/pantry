interface AddIngredientPromptProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};


export default function AddIngredientPromptItem( {handleInputChange}: AddIngredientPromptProps) {
    const today = new Date();
    const oneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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
                value={today.toISOString().split('T')[0]}/>
            <br></br>
            Expiration Date: <input
                name="expiration_date"
                type="date"
                onChange={handleInputChange}
                value={oneWeek.toISOString().split('T')[0]}/>
        </div>
    )
}