import React, { useState, useEffect } from "react";
import { FaSearchengin, FaKeyboard } from "react-icons/fa";
import { BsMicFill } from "react-icons/bs";
import "./SearchXForm.css";

const localDB = [
  {
    title: "ReactJS",
    description: "A JavaScript library for building user interfaces.",
    url: "https://reactjs.org",
  },
  {
    title: "React Native",
    description: "Build mobile apps using React.",
    url: "https://reactnative.dev",
  },
  {
    title: "JavaScript",
    description: "A versatile programming language for the web.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "NodeJS",
    description: "A runtime for executing JavaScript on the server.",
    url: "https://nodejs.org",
  },
  {
    title: "CSS",
    description: "A language for styling web pages.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    title: "HTML",
    description: "The standard markup language for creating web pages.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    title: "Frontend Development",
    description: "Building user interfaces for web applications.",
    url: "https://frontendmasters.com",
  },
  {
    title: "JavaScript Frameworks",
    description: "Popular tools for building JavaScript apps.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Frameworks",
  },
];

const SearchXForm = (props) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);

  useEffect(() => {
    document.getElementById("search-input").focus();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearch(input);

    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter suggestions based on input
    const filteredSuggestions = localDB
      .filter((item) =>
        item.title.toLowerCase().startsWith(input.toLowerCase())
      )
      .slice(0, 10); // Limit to 10 results
    setSuggestions(filteredSuggestions);
    setAutocompleteVisible(true);
  };

  // Handle search
  const performSearch = (searchQuery) => {
    // Filter results based on query
    const filteredResults = localDB.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredResults);

    // Update search history
    if (!searchHistory.find((item) => item === searchQuery)) {
      setSearchHistory([...searchHistory, searchQuery]);
    }
    setAutocompleteVisible(false);
  };

  // Handle result selection
  const handleSelect = (item) => {
    setSearch(item.title);
    performSearch(item.title);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      performSearch(search);
    }
  };

  // Handle focus out of input
  const handleBlur = () => {
    setTimeout(() => setAutocompleteVisible(false), 200); // Delay to allow click events to register
  };

  // Handle focus on input
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setAutocompleteVisible(true);
    }
  };

  // Remove item from search history
  const removeFromHistory = (item) => {
    setSearchHistory(searchHistory.filter((history) => history !== item));
  };

  return (
    <div className="mainpage">
      <div className="mainpage__container">
        <div className="header">SearchX</div>
        <form className="search__form">
          <div>
            <input
              type="text"
              id="search-input"
              className="search__input"
              value={search}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <FaSearchengin className="search__icon" />
            <BsMicFill className="mic__icon" />
            <FaKeyboard className="keyboard__icon" />
            {autocompleteVisible && suggestions.length > 0 && (
              <ul className="autocomplete-list">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className={`autocomplete-item ${
                      searchHistory.includes(item.title) ? "in-history" : ""
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item.title}
                    {searchHistory.includes(item.title) && (
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(item.title);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {results.length > 0 && (
              <div className="results-container">
                <ul className="results-list">
                  {results.map((result, index) => (
                    <li key={index} className="result-item">
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.title}
                      </a>
                      <p>{result.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchXForm;
