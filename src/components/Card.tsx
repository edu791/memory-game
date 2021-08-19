import { CardObject } from '../types';
import styles from './Card.module.css';

export default function Card(props: { data: CardObject, onSelect: (id: number) => void }) {
  function onClickHandler() {
    if (!props.data.isSelected && !props.data.isVisible) {
      props.onSelect(props.data.id);
    }
  }

  return (
    <div className={styles.card} onClick={onClickHandler}>
      {props.data.isVisible && props.data.content}
      {props.data.isVisible && 'visible'} {props.data.isSelected && 'selected'}
    </div>
  );
}
