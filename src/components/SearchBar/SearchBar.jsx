import css from './SearchBar.module.css';
import { IoSearchOutline } from 'react-icons/io5';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// схема валідації input
const SearchFormSchema = Yup.object().shape({
  query: Yup.string().min(1, 'Nothing to search!').required('Required'),
});

export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }}
      validationSchema={SearchFormSchema}
    >
      <header className={css.header}>
        <Form className={css.form}>
          <Field
            className={css.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.btn} type="submit">
            <IoSearchOutline className={css.icon} />
          </button>
        </Form>
      </header>
    </Formik>
  );
}
