import SearchBar from "./searchbar";

export default function SearchRecipe() {
    function search(data: FormData) {
        const query = data.get("query");
        alert(`You searched for '${query}'`);
        fetch("/searchrecipe", {
            method: "GET",
            body: JSON.stringify({recipename: query})
        });
    }

    return (
        <div>
            <SearchBar 
                searchEvent={search}
                searchText="Search Recipe"
                searchName="searchrecipe"
                buttonText="Enter">
            </SearchBar>
        </div>
    )
}