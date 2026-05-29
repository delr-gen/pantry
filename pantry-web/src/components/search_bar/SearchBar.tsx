interface SearchBarProps {
  searchEvent: (data: FormData) => void;
  searchText: string;
  searchName: string;
  buttonText: string;
}

export default function SearchBar ({searchEvent, searchText, searchName, buttonText}: SearchBarProps) {
  // TODO: use state for user input

      return (
        <form action={searchEvent}>
        <label>
            {searchText}
            <input name={searchName}/>
        </label>
        <button type="submit">{buttonText}</button>
        </form>
      );
}

