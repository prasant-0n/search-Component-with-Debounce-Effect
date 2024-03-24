import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

export default function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  const debounceDelay = 500;

  const debouncedSearchTerm = useDebouncedValue(searchTerm, debounceDelay);

  useEffect(() => {
    setSearchTerm(query || "");
  }, [query]);

  useEffect(() => {
    fetchSearchResults(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchSearchResults = (searchTerm) => {
    const appId = "001ab621";
    const appKey = "f0f32129828d1ed1a2330f21acfc639e";

    fetch(
      `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${appKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.hits);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <div>
        {searchResults.map((result, index) => (
          <div key={index} className="result">
            {result.recipe.label}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
