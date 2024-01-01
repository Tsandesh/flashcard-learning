import { createContext, useState, ReactNode } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { CardProps, CardType } from "@/types/CardType";

interface CardContextType {
  addCard: (card: CardProps) => void;
  updateCard: (card: CardProps, question: string) => void;
  getAllCards: () => void;
  deleteCard: (id: string) => void;
  cards: CardType[];
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  async function addCard(card: CardProps) {
    try {
      setToggle(true);
      const res = await addDoc(collection(db, "cards/"), {
        question: card?.question || null,
        answer: card?.answer || null,
        incorrect_answers: card?.incorrect_answers || null,
        options: card?.options || null,
        description: card?.description,
      });

      if (res) {
        return { status: 200 };
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setToggle(false);
    }
  }

  const getAllCards = async () => {
    const querySnapshot = await getDocs(collection(db, "cards"));
    const res = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCards(res);
  };

  const updateCard = async (card: CardProps, question: string) => {
    const cardRef = doc(db, "cards", String(card?.id));
    try {
      setToggle(true);
      await updateDoc(cardRef, {
        question: question || null,
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setToggle(false);
    }
  };

  const deleteCard = async (id: string) => {
    setToggle(true);
    await deleteDoc(doc(db, "cards", id));
    setToggle(false);
  };

  return (
    <CardContext.Provider
      value={{
        addCard,
        getAllCards,
        updateCard,
        deleteCard,
        cards,
        toggle,
        setToggle,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export { CardContext, CardContextProvider };
