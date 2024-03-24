import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Livesearch from "./Livesearch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Livesearch />
    </>
  );
}

export default App;
