import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Study from "./pages/Study";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/study" element={<Study />} />
    </Routes>
  );
}

export default App;
