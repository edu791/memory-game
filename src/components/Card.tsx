import { CardObject } from '../types';
import styles from './Card.module.css';

export default function Card(props: { data: CardObject, onSelect: (id: number) => void }) {
  function onClickHandler() {
    if (!props.data.isSelected && !props.data.isVisible) {
      props.onSelect(props.data.id);
    }
  }

  console.log(props.data.matchResult);
  let matchResult = null;
  if (props.data.matchResult === 'success') {
    matchResult = styles['match-success'];
  } else if (props.data.matchResult === 'failed') {
    matchResult = styles['match-failed'];
  }

  // console.log('matchResult', matchResult);

  return (
    <div className={`${styles.card} ${matchResult}`} onClick={onClickHandler}>
      {props.data.isVisible && props.data.content}
    </div>
  );
}
