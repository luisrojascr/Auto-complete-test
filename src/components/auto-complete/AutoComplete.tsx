import {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import "./AutoComplete.css";
import { ITodo } from "../../types/todos";
import AutoCompleteItem from "./AutoCompleteItem";

interface AutoCompleteProps {
  onSelect: (todo: ITodo) => void;
}

const AutoComplete: FunctionComponent<AutoCompleteProps> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<ITodo[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursor, setCursor] = useState(0);
  const searchContainer = useRef(null);

  const fetchTodos = async () => {
    // This URL should come from .env variable or a config file
    const reqURL = "https://jsonplaceholder.typicode.com";
    try {
      const response = await fetch(`${reqURL}/todos`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ITodo[] = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleClickOutside = () => {
    setShowSuggestions(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShowSuggestions(true);
    setInputValue(value);
  };

  const keyboardNavigation = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      showSuggestions
        ? setCursor((cursor) =>
            cursor < suggestions.length - 1 ? cursor + 1 : cursor
          )
        : setShowSuggestions(true);
    }

    if (event.key === "ArrowUp") {
      setCursor((cursor) => (cursor > 0 ? cursor - 1 : 0));
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
    }

    if (event.key === "Enter" && cursor > -1) {
      setInputValue(suggestions[cursor].title);
      setShowSuggestions(false);
      onSelect(suggestions[cursor]);
    }
  };

  /* 
    To highlight the matching part of the text in the suggestions, we wrap the matching part in a <span> element 
    with a CSS class that applies the highlighting styles.
  */
  const highlightMatch = (text: string) => {
    const parts = text.split(new RegExp(`(${inputValue})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredSuggestions = useMemo(() => {
    if (!inputValue) return suggestions;

    setCursor(0);

    return suggestions.filter((todo) =>
      todo.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [suggestions, inputValue]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete" ref={searchContainer}>
      <input
        className="suggest-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={keyboardNavigation}
        placeholder="Example 'delectus aut autem'"
        aria-label="AutoComplete input"
      />
      {showSuggestions && (
        <ul
          role="listbox"
          aria-label="Suggestions"
          className="suggestions-group"
          tabIndex={0}
        >
          {filteredSuggestions.map((todo, index) => (
            <AutoCompleteItem
              key={todo.id}
              onSelectItem={() => {
                setShowSuggestions(false);
                setInputValue(todo.title);
                onSelect(todo);
              }}
              highlightMatch={highlightMatch}
              isHighlighted={cursor === index ? true : false}
              {...todo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
