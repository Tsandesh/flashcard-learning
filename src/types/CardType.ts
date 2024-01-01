export interface CardProps {
  id?: number;
  question: string;
  answer: string;
  incorrect_answers: string[];
  options: string[];
  description: string;
}

export type CardType = {
  flashcard: CardProps;
};
