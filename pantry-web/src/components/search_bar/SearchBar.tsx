import { Typeahead } from 'react-bootstrap-typeahead';


interface SearchBarProps {
  setQuery: (query: string[]) => void
  handleInputChange: (text:string, event: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[]
  label: (any) => string
}

export default function SearchBar ({setQuery, handleInputChange, options, label}: SearchBarProps) {
      return (
        <form>
          <Typeahead
            id="basic-typeahead-single"
            labelKey={label}
            onChange={setQuery}
            onInputChange={handleInputChange}
            options={options}
          >
          </Typeahead>
          <button type="submit">Search</button>
        </form>

      );
}

