import styles from "./Board.module.css";
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
  const [isComparing, setIsComparing] = useState<boolean>(false);

  useEffect(() => {
    console.log("Set initial values");
    setCards(
      props.initialValues
        .concat(props.initialValues)
        .map((value) => ({
          ...value,
          id: Math.round(Math.random() * 1000000),
          isVisible: false,
          isSelected: false,
          matchResult: null,
        }))
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
    );
  }, [props.initialValues]);

  useEffect(() => {
    if (isComparing) {
      const selectedCards = cards.filter((card) => card.isSelected);
      if (selectedCards.length >= 2) {
        console.log("Comparing selected cards", selectedCards);
        if (selectedCards[0].groupId === selectedCards[1].groupId) {
          console.log("Match");
          selectedCards[0].matchResult = 'success';
          selectedCards[1].matchResult = 'success';
        } else {
          console.log("Don't match");
          selectedCards[0].isVisible = false;
          selectedCards[1].isVisible = false;
          selectedCards[0].matchResult = 'failed';
          selectedCards[1].matchResult = 'failed';
        }
        setCards([...cards]);

        setTimeout(() => {
          onMakeMovement();
          setCards(cards.map((card) => ({ ...card, isSelected: false, matchResult: null })));
          setIsSelecting(false);
          setIsComparing(false);
        }, 1200);
      }
    }

    if (!isSelecting) {
      console.log("Checking if finished");
      if (
        cards.length > 0 &&
        cards.filter((card) => card.isVisible).length === cards.length
      ) {
        onFinished();
      }
    }
  }, [isComparing, isSelecting, cards, onMakeMovement, onFinished]);

  function onSelectCardHandler(id: number) {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isVisible: true, isSelected: true } : card
    );
    const selectedCards = updatedCards.filter((card) => card.isSelected);
    setCards(updatedCards);
    setIsSelecting(true);
    setIsComparing(selectedCards.length === 2);
  }

  console.log("Rendering");

  return (
    <div className={styles.cards}>
      {cards.map((card: CardObject, i: number) => (
        <Card
          key={i}
          data={card}
          onSelect={!isComparing ? onSelectCardHandler : () => {}}
        />
      ))}
    </div>
  );
}
