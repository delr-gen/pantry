interface SearchBarProps {
  searchText: string;
  searchName: string;
  buttonText: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar ({searchText, searchName, buttonText, handleInputChange}: SearchBarProps) {
      return (
        <form>
          <label>
              {searchText}
              <input 
                name={searchName}
                type="text"
                onChange={handleInputChange}
              />
          </label>
          <button type="submit">{buttonText}</button>
        </form>
      );
}

