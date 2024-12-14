import { useState, useEffect, useCallback } from "react";
import { getSearchSuggestions } from "../../API/services/searchSuggestions";
import debounce from 'lodash/debounce';

export const useAutoComplete = (searchQuery: string, debounceTime: number = 300) => {
  const [suggestions, setSuggestions] = useState<ResultsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestionsDebounced = useCallback(debounce(async (query: string) => {
    if (query) {
      setLoading(true);
      try {
        const previews = await getSearchSuggestions(query);
        setSuggestions(previews);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]); // Handle errors gracefully
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, debounceTime), [debounceTime]);


  useEffect(() => {
    fetchSuggestionsDebounced(searchQuery); // Call the debounced function

    // Cleanup: Cancel any pending debounced requests when the component unmounts or searchQuery changes.
    return () => fetchSuggestionsDebounced.cancel();
  }, [searchQuery, fetchSuggestionsDebounced]);

  return { suggestions, loading };
};