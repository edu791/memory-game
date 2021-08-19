import Card from "./Card";
import { useState, useEffect } from "react";
import { CardObject } from "../types";
import { InitialValue } from "../initial-values";

export default function Board(props: {
  initialValues: InitialValue[];
  onMakeMovement: () => void;
  onFinished: () => void;
}) {
  const { onMakeMovement, onFinished } = props;
  const [data, setData] = useState<{
    cards: CardObject[];
    isSelecting: boolean;
  }>({
    cards: [],
    isSelecting: false,
  });

  useEffect(() => {
    setData({
      cards: props.initialValues
        .concat(props.initialValues)
        .map((value) => ({
          ...value,
          id: Math.round(Math.random() * 1000000),
          isVisible: false,
          isSelected: false,
        }))
        .sort(() => (Math.random() > 0.5 ? 1 : -1)),
      isSelecting: false,
    });
  }, [props.initialValues]);

  useEffect(() => {
    if (!data.isSelecting) {
      console.log("Checking if finished");
      if (
        data.cards.length > 0 &&
        data.cards.filter((card) => card.isVisible).length === data.cards.length
      ) {
        onFinished();
      }
    }
  }, [data, onFinished]);

  function onSelectCardHandler(id: number) {
    const cards = data.cards.map((card) =>
      card.id === id ? { ...card, isVisible: true, isSelected: true } : card
    );

    setData({ cards: cards, isSelecting: true });

    const selectedCards = cards.filter((card) => card.isSelected);
    if (selectedCards.length === 2) {
      console.log("Checking selected cards", selectedCards);
      onMakeMovement();
      setTimeout(() => {
        if (selectedCards[0].groupId === selectedCards[1].groupId) {
          console.log("Match");
        } else {
          console.log("Don't match");
          selectedCards[0].isVisible = false;
          selectedCards[1].isVisible = false;
        }
        setData({
          cards: cards.map((card) => ({ ...card, isSelected: false })),
          isSelecting: false,
        });
      }, 1200);
    }
  }

  console.log("Rendering");

  return (
    <div>
      {data.cards.map((card: CardObject, i: number) => (
        <Card key={i} data={card} onSelect={onSelectCardHandler} />
      ))}
    </div>
  );
}
