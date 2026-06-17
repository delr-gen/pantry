import 'react-bootstrap-typeahead/css/Typeahead.css';
import SearchBar from "./SearchBar";
import { useEffect, useState } from 'react';

async function search(query: string) {
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
    const [searchQuery, setSearchQuery] = useState("");
    
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
    }

    useEffect(() => {
        if (searchQuery != "") {
            search(searchQuery)
        }
    }, 
    [searchQuery]);

    return (
        <div>
            <SearchBar 
                searchText="Search Recipe"
                searchName="recipequery"
                buttonText="Enter"
                handleInputChange={handleInputChange}>
            </SearchBar>
        </div>
    )
}