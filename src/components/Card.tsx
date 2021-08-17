import { CardObject } from '../types';

export default function Card(props: { data: CardObject, onSelect: (id: number) => void }) {
  function onClickHandler() {
    if (!props.data.isSelected && !props.data.isVisible) {
      props.onSelect(props.data.id);
    }
  }

  return (
    <div onClick={onClickHandler}>
      {props.data.content} {props.data.isVisible && 'visible'} {props.data.isSelected && 'selected'}
    </div>
  );
}
