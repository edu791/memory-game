import styles from "./Board.module.css";
import Card from "./Card";
import { useEffect, useReducer } from "react";
import { CardObject } from "../types";
import { CardValue } from "../card-values";

type BoardState = {
  cards: CardObject[];
  isSelecting: boolean;
  isComparing: boolean;
};

enum ActionType {
  SetInitialValues,
  SelectCard,
  CompareCards,
  ClearSelection,
}

type SetInitialValues = {
  type: ActionType.SetInitialValues;
  payload: { values: CardValue[] };
};

type SelectCard = {
  type: ActionType.SelectCard;
  payload: { id: number };
};

type CompareCards = {
  type: ActionType.CompareCards;
};

type ClearSelection = {
  type: ActionType.ClearSelection;
};

type ReducerActions =
  | SetInitialValues
  | SelectCard
  | CompareCards
  | ClearSelection;

function reducer(state: BoardState, action: ReducerActions): BoardState {
  switch (action.type) {
    case ActionType.SetInitialValues: {
      console.log("Set initial values");
      return {
        cards: action.payload.values.map((value) => ({
          ...value,
          id: Math.round(Math.random() * 1000000),
          isSelected: false,
          isMatched: false,
          matchResult: null,
        })),
        isSelecting: false,
        isComparing: false,
      };
    }
    case ActionType.SelectCard: {
      console.log("Select card");
      const updatedCards = state.cards.map((card) =>
        card.id === action.payload.id ? { ...card, isSelected: true } : card
      );
      const selectedCards = updatedCards.filter((card) => card.isSelected);
      return {
        cards: updatedCards,
        isSelecting: true,
        isComparing: selectedCards.length === 2,
      };
    }
    case ActionType.CompareCards: {
      const selectedCards = state.cards.filter((card) => card.isSelected);
      console.log("Comparing selected cards", selectedCards);
      if (selectedCards[0].groupId === selectedCards[1].groupId) {
        console.log("Match");
        selectedCards[0].isMatched = true;
        selectedCards[0].matchResult = "success";
        selectedCards[1].isMatched = true;
        selectedCards[1].matchResult = "success";
      } else {
        console.log("Don't match");
        selectedCards[0].matchResult = "failed";
        selectedCards[1].matchResult = "failed";
      }

      return {
        cards: state.cards,
        isSelecting: true,
        isComparing: true,
      };
    }
    case ActionType.ClearSelection: {
      console.log("Clear selection");
      return {
        cards: state.cards.map((card) => ({
          ...card,
          isSelected: false,
          matchResult: null,
        })),
        isSelecting: false,
        isComparing: false,
      };
    }
    default:
      return state;
  }
}

export default function Board(props: {
  initialValues: CardValue[];
  onMakeMovement: () => void;
  onFinished: () => void;
}) {
  const { onMakeMovement, onFinished } = props;
  const [state, dispatch] = useReducer(reducer, {
    cards: [],
    isSelecting: false,
    isComparing: false,
  });

  useEffect(() => {
    dispatch({
      type: ActionType.SetInitialValues,
      payload: { values: props.initialValues },
    });
  }, [props.initialValues]);

  useEffect(() => {
    if (state.isComparing) {
      dispatch({ type: ActionType.CompareCards });
      setTimeout(() => {
        dispatch({ type: ActionType.ClearSelection });
      }, 1200);
      onMakeMovement();
    }
  }, [state.isComparing, onMakeMovement]);

  useEffect(() => {
    if (!state.isSelecting) {
      console.log("Checking if finished");
      if (
        state.cards.length > 0 &&
        state.cards.filter((card) => card.isMatched).length ===
          state.cards.length
      ) {
        console.log("Game finished");
        onFinished();
      }
    }
  }, [state.isSelecting, state.cards, onFinished]);

  function onSelectCardHandler(id: number) {
    dispatch({ type: ActionType.SelectCard, payload: { id } });
  }

  console.log("render Board");

  return (
    <div className={styles.cards}>
      {state.cards.map((card: CardObject, i: number) => (
        <Card
          key={i}
          data={card}
          onSelect={!state.isComparing ? onSelectCardHandler : () => {}}
        />
      ))}
    </div>
  );
}
