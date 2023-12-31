import { CardContext } from "@/context/Cardcontext";
import { decodeString } from "@/lib/utils";
import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Navbar = () => {
  const context = useContext(CardContext);

  if (!context) {
    console.log("No COntext Data");
    return null;
  }

  const { setFlashCards, categories, setCategories } = context;

  const categoryEl = useRef<HTMLSelectElement>(null);
  const amountEl = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl?.current?.value,
          category: categoryEl?.current?.value,
        },
      })
      .then((res) => {
        setFlashCards(
          res.data.results.map((questionItem: any, index: number) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a: string) =>
                decodeString(a)
              ),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: questionItem?.question,
              answer: questionItem.correct_answer,
              options: options.sort(() => Math.random() - 5),
            };
          })
        );
      });
  };

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res?.data?.trivia_categories);
    });
  }, []);

  return (
    <div className="header border-1">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center align-center "
      >
        {categories && (
          <div className="form-group">
            <label htmlFor="category">Category</label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem
                      value={category.id.toString()}
                      key={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="amount">Number of Questions ?</label>
          <Input
            type="number"
            id="amount"
            min={1}
            step={1}
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <Button className="btn">Generate</Button>
        </div>
      </form>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
