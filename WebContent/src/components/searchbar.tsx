export default function SearchBar () {
    function search(formData) {
        const query = formData.get("query");
        alert(`You searched for '${query}'`);
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

