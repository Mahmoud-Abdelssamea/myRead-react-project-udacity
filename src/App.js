import { Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./Pages/Books";
import Home from "./Pages/Home";
import Search from "./Pages/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/all" element={<Books />} />
      </Routes>
    </div>
  );
}

export default App;
