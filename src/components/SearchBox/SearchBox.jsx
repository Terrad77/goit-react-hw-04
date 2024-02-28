import css from './SearchBox.module.css';
import { useId } from 'react';

//Поле пошуку – це інпут без форми, значення якого записується у стан контрольований елемент,
//передаємо value - значення стану, onChange - сеттер
export default function SearchBox({ value, onChange }) {
  const nameFieldId = useId();
  return (
    <div className={css.wraper}>
      <label
        className={css.label}
        htmlFor={nameFieldId}
        aria-labelledby="searchLabel"
      >
        Find contacts by name
      </label>
      <input
        className={css.field}
        type="text"
        name="name"
        id={nameFieldId}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
