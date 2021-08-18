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
  const [cards, setCards] = useState<CardObject[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

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
    console.log("Changed cards");
    if (isSelecting) {
      console.log("Checking selected cards");
      const selectedCards = cards.filter((card) => card.isSelected);
      if (selectedCards.length === 2) {
        onMakeMovement();
        console.log("Two selected cards");
        if (selectedCards[0].groupId === selectedCards[1].groupId) {
          console.log("Match");
        } else {
          console.log("Don't match");
          selectedCards[0].isVisible = false;
          selectedCards[1].isVisible = false;
        }
        console.log("before setTimeout");
        setTimeout(() => {
          console.log("after setTimeout");
          setCards(cards.map((card) => ({ ...card, isSelected: false })));
          setIsSelecting(false);
        }, 1200);
      }
    } else {
      if (cards.length > 0 && cards.filter((card) => card.isVisible).length === cards.length) {
        onFinished();
      }
    }
  }, [isSelecting, cards, onMakeMovement, onFinished]);

  function onSelectCardHandler(id: number) {
    setIsSelecting(true);
    setCards((cards) => {
      return cards.map((card) =>
        card.id === id ? { ...card, isVisible: true, isSelected: true } : card
      );
    });
  }

  console.log("Rendering");

  return (
    <div>
      {cards.map((card: CardObject, i: number) => (
        <Card key={i} data={card} onSelect={onSelectCardHandler} />
      ))}
    </div>
  );
}
