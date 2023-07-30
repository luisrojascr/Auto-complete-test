import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AutoComplete from "./components/auto-complete/AutoComplete";
import { useState } from "react";
import { ITodo } from "./types/todos";

function App() {
  const [todo, setTodo] = useState("");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Auto-Complete</h1>
      <AutoComplete onSelect={(todo: ITodo) => setTodo(todo.title)} />
      {todo && <p>The selected todo: {todo}</p>}
      <footer>
        <p>
          Built by{" "}
          <a href="https://luirojasportfolio.netlify.app/" target="_blank">
            Luis Rojas
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
