export default function Orderedlist() {
    function getList() {
        fetch("list", {method: "GET"});
    }
    return (
        <form action={getList}>
        <label>
            Ingredients
            <input name="query" id="query"/>
        </label>
          <button type="submit">See Ingredients</button>
        </form>
    )
}
