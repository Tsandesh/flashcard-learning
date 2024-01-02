import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardContext } from "@/context/Cardcontext";
import GeneralLayout from "@/layout/GeneralLayout";
import { CardProps } from "@/types/CardType";
import { useContext, useEffect } from "react";

const Study = () => {
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
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Welcome to Study Mode
        </h1>
        <span className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Lets learn the answers to your Questions
        </span>

        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {cards.map((card) => {
              return (
                <AccordionItem value={card?.question}>
                  <AccordionTrigger>{card.question}</AccordionTrigger>
                  <AccordionContent>
                    <h2 className="text-semibold text-2xl">
                      {" "}
                      Answer :{card.answer}.
                    </h2>
                    <p className="mt-2">Because : {card?.description}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
    </GeneralLayout>
  );
};

export default Study;
