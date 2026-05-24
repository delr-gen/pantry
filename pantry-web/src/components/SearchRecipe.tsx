import SearchBar from "./SearchBar";

async function search(data: FormData) {
    const query = data.get("recipequery");
    alert(`You searched for '${query}'`);
    if (typeof query === "string"){
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipesearch/${query}`, {
                method: "GET"
            });
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            else {
                const data = await response.json();
                console.log(data);
            }
        }
        catch (error: unknown) {
            if (error instanceof Error){
                console.error(error.message);
            }
        }
    }
    

}

export default function SearchRecipe() {
    return (
        <div>
            <SearchBar 
                searchEvent={search}
                searchText="Search Recipe"
                searchName="recipequery"
                buttonText="Enter">
            </SearchBar>
        </div>
    )
}