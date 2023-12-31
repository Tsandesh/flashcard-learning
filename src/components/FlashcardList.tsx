import FlashCard from "./FlashCard";

const FlashcardList = ({ flashcards }: any) => {
  return (
    <div className="card-grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {flashcards.map((flashcard: any) => {
        return <FlashCard flashcard={flashcard} />;
      })}
    </div>
  );
};

export default FlashcardList;
