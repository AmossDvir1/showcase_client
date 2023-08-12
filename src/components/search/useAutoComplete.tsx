import { useState, useEffect } from "react";
import { getSearchSuggestions } from "../../API/services/searchSuggestions";

export const useAutoComplete = (
  searchQuery: string,
  debounceTime: number = 300
) => {
  const [suggestions, setSuggestions] = useState<ResultsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setLoading(true);

        const fetchPreviews = async () => {
          const previews = await getSearchSuggestions(searchQuery);
          setSuggestions(previews);
        };
        fetchPreviews();
      } else {
        setSuggestions([]);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceTime]);

  return { suggestions, loading };
};
