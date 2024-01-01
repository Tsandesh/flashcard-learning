import { useContext, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CardContext } from "@/context/Cardcontext";
import { Check, DeleteIcon, Edit2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardType } from "@/types/CardType";

const FlashCard = ({ flashcard }: CardType) => {
  const context = useContext(CardContext);
  if (!context) {
    return null;
  }
  const { updateCard, deleteCard } = context;

  const [flip, setFlip] = useState(false);
  const [edit, setEdit] = useState(false);
  const [question, setQuestion] = useState("");

  const frontEl = useRef<HTMLDivElement | null>(null);
  const backEl = useRef<HTMLDivElement | null>(null);

  const handleSave = () => {
    updateCard(flashcard, question);
  };

  return (
    <>
      <Card
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
        style={{ height: "300px" }}
      >
        <div className="front" ref={frontEl}>
          <CardHeader>
            <div className="flex justify-between w-full">
              {edit ? (
                <Input
                  defaultValue={flashcard?.question}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              ) : (
                <CardTitle> {flashcard?.question}</CardTitle>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flashcard-options">
              {flashcard?.options?.map((option) => {
                return (
                  <div
                    className="flashcard-option text-slate-700 text-lg"
                    key={option}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            {!edit ? (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEdit(!edit);
                  }}
                >
                  <Edit2 />
                </Button>
              </>
            ) : (
              <Button>
                <Check
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                    setEdit(!edit);
                  }}
                />
              </Button>
            )}

            <Button
              onClick={(e) => {
                e.stopPropagation();
                deleteCard(flashcard?.id?.toString() ?? "");
              }}
              variant={"outline"}
            >
              <DeleteIcon color="red" />
            </Button>
          </CardFooter>
        </div>
        <div className="back" ref={backEl}>
          {flashcard?.answer}
        </div>
      </Card>
    </>
  );
};

export default FlashCard;
