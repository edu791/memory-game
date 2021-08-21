import { CardObject } from '../types';
import styles from './Card.module.css';

export default function Card(props: { data: CardObject, onSelect: (id: number) => void }) {
  function onClickHandler() {
    if (!props.data.isSelected) {
      props.onSelect(props.data.id);
    }
  }

  let matchResult = null;
  if (props.data.matchResult === 'success') {
    matchResult = styles['match-success'];
  } else if (props.data.matchResult === 'failed') {
    matchResult = styles['match-failed'];
  }

  return (
    <div className={`${styles.card} ${matchResult}`} onClick={onClickHandler}>
      {(props.data.isSelected || props.data.isMatched) && props.data.content}
    </div>
  );
}
