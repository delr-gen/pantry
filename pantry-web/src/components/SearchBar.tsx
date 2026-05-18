import GetButton from "./GetButton"

interface SearchBarProps {
  searchEvent: (data: FormData) => void;
  searchText: string;
  searchName: string;
  buttonText: string;
}

export default function SearchBar ({searchEvent, searchText, searchName, buttonText}: SearchBarProps) {
  /*
    function search(formData: FormData) {
        const query = formData.get("query");
        alert(`You searched for '${query}'`);
      }
  */

      return (
        <form action={searchEvent}>
        <label>
            {searchText}
            <input name={searchName}/>
        </label>
          <GetButton
            buttonText={buttonText}
          />
        </form>
      );
}

