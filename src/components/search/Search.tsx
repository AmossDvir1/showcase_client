import { FC, useState } from "react";
import LiveSearch from "./LiveSearch";
import { useAutoComplete } from "./useAutoComplete";

interface Props<T> {}

const Search: FC<Props<ResultsItem>> = (props): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ResultsItem | undefined>(); 
  const { suggestions, loading } = useAutoComplete(value, 300);

  const handleChange = (newVal: string) => {
    setValue(newVal); 
  };

  return (
    <LiveSearch
      results={suggestions}
      value={value}
      onChange={handleChange}
      onSelect={(item) => setSelectedItem(item)}
      loading={loading}
    />
  );
};

export default Search;