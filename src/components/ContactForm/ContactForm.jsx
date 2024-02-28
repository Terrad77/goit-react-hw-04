import css from './ContactForm.module.css';
//бібл форм Formik + бібл валідації yup: npm install formik yup
import { Formik, Form, Field, ErrorMessage } from 'formik';
//namespace import
import * as Yup from 'yup';
//хук унікальних ідентифікаторів полів useId
import { useId } from 'react';
// import { useState } from 'react'; formik створюю state сам
// бібл генерації ідентифікаторів : npm install nanoid
import { nanoid } from 'nanoid';

// Об'являємо схему валідації об'єкта
const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short name!')
    .max(50, 'Too long name!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too short number!')
    .max(50, 'Too long number!')
    .required('Required'),
});

export default function ContactForm({ onAdd }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{
        id: '',
        name: '',
        number: '',
      }}
      onSubmit={(values, { resetForm }) => {
        const newContact = {
          id: nanoid(5),
          name: values.name,
          number: values.number,
        };
        onAdd(newContact);
        resetForm();
      }}
      validationSchema={ContactFormSchema} // схема валидации
      validationOnBlur={false} // нет валидации при выходе из поля
      validateOnChange={false} // нет валидации при каждом изменении значений
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field className={css.field} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label htmlFor={numberFieldId}>Number</label>
        <Field
          className={css.field}
          type="tel"
          name="number"
          id={numberFieldId}
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="123-45-67"
        />
        <ErrorMessage className={css.error} name="number" component="span" />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
