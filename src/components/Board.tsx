import Card from "./Card";
import { useState, useEffect } from "react";
import { CardObject } from "../types";
import { InitialValue } from "../initial-values";

export default function Board(props: { initialValues: InitialValue[] }) {
  const [cards, setCards] = useState<CardObject[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useEffect(() => {
    setCards(
      props.initialValues
        .concat(props.initialValues)
        .map((value) => ({
          ...value,
          id: Math.round(Math.random() * 1000000),
          isVisible: false,
          isSelected: false,
        }))
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
    );
  }, [props.initialValues]);

  useEffect(() => {
    console.log('Changed cards');
    if (isSelecting) {
      console.log('Checking selected cards');
      const selectedCards = cards.filter(card => card.isSelected);
      if (selectedCards.length === 2) {
        console.log('Two selected cards');
        if (selectedCards[0].groupId === selectedCards[1].groupId) {
          console.log('Match');
          selectedCards[0].isVisible = true;
          selectedCards[1].isVisible = true;
        }
        selectedCards[0].isSelected = false;
        selectedCards[1].isSelected = false;
        setCards([...cards]);
        setIsSelecting(false);
      }
    } else if (gameStarted) {
      checkGameFinished();
    }
  }, [isSelecting, cards, gameStarted, checkGameFinished]);

  function checkGameFinished() {
    console.log('checkGameFinished', cards);
    if (cards.filter(card => card.isVisible).length === cards.length) {
      console.log('Game Finished!!!!');
      setGameFinished(true);
    }
  }

  function onSelectCardHandler(id: number) {
    setGameStarted(true);
    setIsSelecting(true);
    setCards((cards) => {
      return cards.map((card) =>
        card.id === id ? { ...card, isSelected: true } : card
      );
    });
  }

  return (
    <div>
      <div>{gameFinished && 'Game Finished!!!!'}</div>
      {cards.map((card: CardObject, i: number) => (
        <Card key={i} data={card} onSelect={onSelectCardHandler} />
      ))}
    </div>
  );
}
