interface AddIngredientPromptProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};


export default function AddIngredientPrompt( {handleInputChange}: AddIngredientPromptProps) {
    const today = new Date();
    const oneWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return (
        <div>
            <input
                name="name"
                type="text"
                onChange={handleInputChange}
                placeholder="ex: cabbage, beef stock, ..."/>
            <input
                name="quantity"
                type="number"
                onChange={handleInputChange}
                defaultValue={1} />
            <input
                name="unit"
                type="text"
                onChange={handleInputChange}
                defaultValue="Unit"/>
            <input
                name="date_bought"
                type="date"
                onChange={handleInputChange}
                defaultValue={today.toISOString().split('T')[0]}/>
            <input
                name="expiration_date"
                type="date"
                onChange={handleInputChange}
                defaultValue={oneWeek.toISOString().split('T')[0]}/>
        </div>
    )
}