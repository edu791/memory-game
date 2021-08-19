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
  const [data, setData] = useState<{
    cards: CardObject[];
    isSelecting: boolean;
    isComparing: boolean;
  }>({
    cards: [],
    isSelecting: false,
    isComparing: false,
  });

  useEffect(() => {
    console.log("Set initial values");
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
      isComparing: false,
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

  useEffect(() => {
    console.log('useEffect comparing');
    if (data.isComparing) {
      const selectedCards = data.cards.filter((card) => card.isSelected);
      console.log("Comparing selected cards", selectedCards);
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
          cards: data.cards.map((card) => ({ ...card, isSelected: false })),
          isSelecting: false,
          isComparing: false,
        });
      }, 1200);
    }
  }, [data.isComparing, data.cards, onMakeMovement]);

  function onSelectCardHandler(id: number) {
    const cards = data.cards.map((card) =>
      card.id === id ? { ...card, isVisible: true, isSelected: true } : card
    );
    const selectedCards = cards.filter((card) => card.isSelected);
    setData({ cards: cards, isSelecting: true, isComparing: (selectedCards.length === 2) });
  }

  console.log("Rendering");

  return (
    <div>
      {data.cards.map((card: CardObject, i: number) => (
        <Card key={i} data={card} onSelect={!data.isComparing ? onSelectCardHandler: () => {}} />
      ))}
    </div>
  );
}
