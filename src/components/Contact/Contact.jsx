import css from './Contact.module.css';
//for use icons install library react-icons до проекту як пакет NPM: npm install react-icons --save
//import icons
import { IoPersonSharp } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';

export default function Contact({ id, name, number, onDelete }) {
  return (
    <div className={css.contactCard}>
      <ul className={css.contactList}>
        <li className={css.contactItem}>
          <IoPersonSharp />
          {name}
        </li>
        <li className={css.contactItem}>
          <FaPhone />
          {number}
        </li>
      </ul>
      <button className={css.btn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
