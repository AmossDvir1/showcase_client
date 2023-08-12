import { FC, useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";
import { useAutoComplete } from "./useAutoComplete";

interface Props<T> {}

const resultItems = [
  {
    id: "1",
    name: "SnapScape",
    description: "Photo Adventure App",
    type: "project",
  },
  {
    id: "2",
    name: "Code to Success",
    description: "Unlocking the Power of Programming",
    type: "post",
  },
  { id: "3", name: "Gabrielle", type: "profile" },
  {
    id: "4",
    name: "Navigating the Digital Frontier: Future Tech Trends",
    description: "Unlocking the Power of Programming",
    type: "post",
  },
  {
    id: "5",
    name: "MindCraft",
    description: "Creative Ideas Generator",
    type: "project",
  },
  { id: "6", name: "Heather", type: "profile" },
  {
    id: "7",
    name: "Grocery Guru",
    description: "Smart Shopping List",
    type: "project",
  },
  { id: "8", name: "Anne Teak", type: "profile" },
  {
    id: "9",
    name: "AI and Automation: Redefining Work in the Digital Age",
    type: "post",
  },
  { id: "10", name: "Addie Minstra", type: "profile" },
  { id: "11", name: "Anne Ortha", type: "profile" },
];

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
    <div className="px-20">
      <LiveSearch
        results={results}
        value={value}
        onChange={handleChange}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
};

export default Search;
