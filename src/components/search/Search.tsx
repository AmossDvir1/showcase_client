import { FC, useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";
import { useAutoComplete } from "./useAutoComplete";

interface Props<T> {}

const Search: FC<Props<ResultsItem>> = (props): JSX.Element => {
  const [results, setResults] = useState<ResultsItem[]>([]); // Use the Item type
  const [value, setValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ResultsItem | undefined>(); // Use the Item type
  const { suggestions, loading } = useAutoComplete(value, 300);

  const handleChange = (newVal: string) => {
    setValue(newVal ?? "");
    const val = newVal?.trim();
    if (!val || val === "") {
      return setResults([]);
    }

    setResults(suggestions && !loading ?suggestions : []);
  };

  useEffect(() => suggestions && setResults(suggestions), [suggestions]);

  return (
      <LiveSearch
        results={results}
        value={value}
        onChange={handleChange}
        onSelect={(item) => setSelectedItem(item)}
      />
  );
};

export default Search;
