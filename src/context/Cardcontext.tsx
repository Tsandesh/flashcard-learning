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
import { CardProps } from "@/types/CardType";
import { useToast } from "@/components/ui/use-toast";

interface CardContextType {
  addCard: (card: CardProps) => void;
  updateCard: (card: CardProps, question: string) => void;
  getAllCards: () => void;
  deleteCard: (id: string) => void;
  cards: CardProps[];
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const { toast } = useToast();

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
        toast({
          title: "Success",
          description: "Document successfully Added!",
        });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Error adding document: " });
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
      toast({
        title: "Success",
        description: "Document successfully updated!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error ${error}`,
        description: "Document  update Error",
      });
    } finally {
      setToggle(false);
    }
  };

  const deleteCard = async (id: string) => {
    setToggle(true);
    await deleteDoc(doc(db, "cards", id));
    setToggle(false);
    toast({
      variant: "destructive",
      title: "Success",
      description: "Document Deleted !",
    });
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
