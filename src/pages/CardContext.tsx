import React, { ReactNode, createContext, useState } from 'react';
import { cardCollection } from '../components/exampleData';
import CardScreen from './CardScreen';

interface CardContextType {
  finished: number;
  setFinished: React.Dispatch<React.SetStateAction<number>>
  cardCol: any[]; // Replace 'any' with the actual type of your card collection
  setCards: React.Dispatch<React.SetStateAction<any[]>>; // Replace 'any' with the actual type of your card collection
}

const CardContext = createContext<CardContextType>({
  finished: 0,
  setFinished: () => {},
  cardCol: [],
  setCards: () => {}
});

export const CardProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  console.log("children: ", children)
  const [cardCol, setCards] = useState<any[]>(cardCollection);
  const [finished, setFinished] = useState<number>(0);

  return (
    <CardContext.Provider value={{ cardCol: cardCol,finished, setFinished, setCards: setCards }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
