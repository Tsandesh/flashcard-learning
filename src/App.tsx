import { useContext } from "react";
import FlashcardList from "./components/FlashcardList";
import "./App.css";

import Navbar from "./components/Navbar";
import { CardContext } from "./context/Cardcontext";

function App() {
  const context = useContext(CardContext);
  if (!context) {
    console.log("No COntext Data");
    return null;
  }

  const { flashCards } = context;

  return (
    <>
      <Navbar />
      <div className="container">
        <FlashcardList flashcards={flashCards} />
      </div>
    </>
  );
}

export default App;
