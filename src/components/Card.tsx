import { CardObject } from '../types';

export default function Card(props: { data: CardObject, onSelect: any }) {
  function onClickHandler() {
    props.onSelect(props.data.id);
  }

  return (
    <div onClick={onClickHandler}>
      {props.data.content} {props.data.isSelected && 'selected'}
    </div>
  );
}
