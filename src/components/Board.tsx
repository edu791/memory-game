import Card from "./Card";
import { useState, useEffect } from "react";
import { CardObject } from "../types";
import { InitialValue } from "../initial-values";

export default function Board(props: { initialValues: InitialValue[] }) {
  const [cards, setCards] = useState<CardObject[]>([]);

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
    const selectedCards = cards.filter(card => card.isSelected);
    if (selectedCards.length === 2) {
      if (selectedCards[0].groupId === selectedCards[1].groupId) {
        console.log('MATCH');
      } else {
        console.log('DONT MATCH');
      }
      setCards(cards.map(cards => ({...cards, isSelected: false})));
    }
  }, [cards]);

  function onSelectCardHandler(id: number) {
    setCards((cards) => {
      return cards.map((card) =>
        card.id === id ? { ...card, isSelected: true } : card
      );
    });
  }

  return (
    <div>
      {cards.map((card: CardObject, i: number) => (
        <Card key={i} data={card} onSelect={onSelectCardHandler} />
      ))}
    </div>
  );
}
