import { useContext, useEffect } from "react";
import FlashcardList from "@/components/FlashcardList";
import { CardContext } from "@/context/Cardcontext";
import GeneralLayout from "@/layout/GeneralLayout";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  const context = useContext(CardContext);
  if (!context) {
    console.log("No Context Data");
    return null;
  }

  const { cards, getAllCards, toggle } = context;

  useEffect(() => {
    getAllCards();
  }, [toggle]);

  return (
    <GeneralLayout>
      <HeroSection />
      <div className="container">
        <h1 className="text-center text-3xl font-bold leading-tight">
          Your Flash Cards
        </h1>
        <p className="text-center text-lg text-muted-foreground ">
          Let's see how much you've progressed so far. <br />
          You Have MCQ try to guess the right answer
        </p>
        <FlashcardList flashcards={cards} />
      </div>
    </GeneralLayout>
  );
};

export default Home;
