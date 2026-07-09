import SearchBar from "./SearchBar";
import { useEffect, useState } from 'react';

interface Recipe{
    id: number,
    name: string,
    mins: number,
    servingSize: number,
    steps: string[]
};

function label(recipe: Recipe) {
    return `${recipe.name}`;
}

async function search(query: string) {
    //alert(`You searched for '${query}'`);
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
                return data;
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
    const [searchQuery, setSearchQuery] = useState([]);
    const [options, setOptions] = useState([]);
    
    function handleInputChange(text:string) {
        setSearchQuery([text]);
    }

    useEffect(() => {
        if (searchQuery.length != 0) {
            search(searchQuery[0]).then((response) => {
                setOptions(response)
            })
        }
    }, 
    [searchQuery]);

    return (
        <div>
            <SearchBar 
                setQuery={setSearchQuery}
                handleInputChange={handleInputChange}
                options={options}
                label={label}
            >
            </SearchBar>
        </div>
    )
}