export default function SearchBar () {
    function search(formData: FormData) {
        const query = formData.get("query");
        alert(`You searched for '${query}'`);
        /*
        fetch({
            dataType: "json", // Setting return data type
            method: "GET", // Setting request method
            url: "api/recipesearch", // Setting request url, which is mapped by IndexServlet in IndexServlet.java
            success: (resultData) => (alert(resultData["get"])) // Setting callback function to handle data returned successfully by the StarsSer>
        });
        */
      }
      return (
        <form action={search}>
        <label>
            Search
            <input name="query" id="query"/>
        </label>
          <button type="submit">Search</button>
        </form>
      );
}

