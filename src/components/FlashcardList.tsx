import { CardProps, CardType } from "@/types/CardType";
import FlashCard from "./FlashCard";

const FlashcardList = ({ flashcards }: any) => {
  return (
    <div className="card-grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4">
      {flashcards.map((flashcard: CardProps) => {
        return <FlashCard flashcard={flashcard} key={flashcard?.id} />;
      })}
    </div>
  );
};

export default FlashcardList;
