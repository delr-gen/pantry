import SubmitButton from "./SubmitButton"

interface SearchBarProps {
  searchEvent: (data: FormData) => void;
  searchText: string;
  searchName: string;
  buttonText: string;
}

export default function SearchBar ({searchEvent, searchText, searchName, buttonText}: SearchBarProps) {
  // TODO: use state for user input
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
          <SubmitButton
            buttonText={buttonText}
          />
        </form>
      );
}

