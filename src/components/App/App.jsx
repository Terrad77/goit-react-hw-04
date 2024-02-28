import css from './App.module.css';
import initialContacts from '../../data/initialContacts.json';
import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';

//ф-ція що зчитує значення localStorage
const getInitialContacts = () => {
  const savedContacts = window.localStorage.getItem('contacts');
  return savedContacts !== null ? JSON.parse(savedContacts) : initialContacts;
};

export default function App() {
  const [contacts, setContacts] = useState(getInitialContacts); // початковий стан контактів
  const [filter, setFilter] = useState(''); // початковий стан фільтра пошуку SearchBox

  // змінна де зберігаємо відфільтровані контакти не записуючи в стан, пропс до ContactList
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // для колекції елементів використовують функціональну форму сеттеру!
  // ф-ція повертає змінений стану контактів (додавання)
  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  // ф-ція повертає змінений стану контактів (видалення)
  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  // Збереження контактів у локальному сховищі при зміні станів
  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error storing contacts or filter in localStorage:', error);
    }
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}
