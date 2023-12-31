import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";

const FlashCard = ({ flashcard }: any) => {
  const [flip, setFlip] = useState(false);

  const [height, setHeight] = useState<number | string | undefined>("initial");
  const frontEl = useRef<HTMLDivElement | null>(null);
  const backEl = useRef<HTMLDivElement | null>(null);
  function setMaxHeight() {
    const frontHeight = frontEl?.current?.getBoundingClientRect().height;
    const backHeight = backEl?.current?.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight || 0, backHeight || 0, 100));
  }

  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.options,
  ]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);
  return (
    <>
      <Card
        className={` card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
        style={{ height: height }}
      >
        <div className="front" ref={frontEl}>
          {flashcard?.question}
          <div className="flashcard-options">
            {flashcard.options.map((option: any) => {
              return (
                <div className="flashcard-option" key={option}>
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="back" ref={backEl}>
          {flashcard?.answer}
        </div>
      </Card>
    </>
  );
};

export default FlashCard;
