import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContext } from "@/context/Cardcontext";
import { Textarea } from "./ui/textarea";

type DilogType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DialogDemo({ isOpen, setIsOpen }: DilogType) {
  const context = useContext(CardContext);
  if (!context) {
    return null;
  }
  const { addCard, toggle } = context;
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", "", ""]);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newItem = {
      question: question,
      answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      options: [...incorrectAnswers, correctAnswer].sort(
        () => Math.random() - 0.5
      ),
      description,
    };
    addCard(newItem);
    // setUserCards([...userCards, newItem]);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen === false) {
      setQuestion("");
      setCorrectAnswer("");
      setIncorrectAnswers(["", "", "", ""]), setDescription("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a flash card</DialogTitle>
          <DialogDescription>
            Fill up everything below to create a card
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              question
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="answer" className="text-right">
              Answer
            </Label>
            <Input
              id="answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="col-span-3"
            />
          </div>{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="option1" className="text-right">
              Option 1
            </Label>
            <Input
              id="option1"
              value={incorrectAnswers[0]}
              onChange={(e) =>
                setIncorrectAnswers([
                  e.target.value,
                  incorrectAnswers[1],
                  incorrectAnswers[2],
                ])
              }
              className="col-span-3"
            />
          </div>{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="option2" className="text-right">
              Option 2
            </Label>
            <Input
              id="option2"
              value={incorrectAnswers[1]}
              onChange={(e) =>
                setIncorrectAnswers([
                  incorrectAnswers[0],
                  e.target.value,
                  incorrectAnswers[2],
                ])
              }
              className="col-span-3"
            />
          </div>{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="option3" className="text-right">
              Option 3
            </Label>
            <Input
              id="option3"
              value={incorrectAnswers[2]}
              onChange={(e) =>
                setIncorrectAnswers([
                  incorrectAnswers[0],
                  incorrectAnswers[1],
                  e.target.value,
                ])
              }
              className="col-span-3"
            />
          </div>{" "}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Tell us about answer"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>

          {toggle ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Save changes</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}