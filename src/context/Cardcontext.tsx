import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface CardContextType {
  flashCards: any[];
  setFlashCards: Dispatch<SetStateAction<any[]>>;
  categories: any[]; // Ensure that this is always an array
  setCategories: Dispatch<SetStateAction<any[]>>; // Ensure that this is always a Dispatch function
}

const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider = ({ children }: { children: ReactNode }) => {
  const [flashCards, setFlashCards] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  return (
    <CardContext.Provider
      value={{
        flashCards: flashCards || [],
        setFlashCards,
        categories: categories || [],
        setCategories,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, CardContextProvider };
