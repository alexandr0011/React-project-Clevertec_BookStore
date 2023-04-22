import { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import styles from './second-step.module.scss';

export function SecondStepRegistration({ userData, setUserData }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const firstNamePlaceholderStyle = firstName
    ? cn(styles.name_placeholder, styles.touched_input)
    : styles.name_placeholder;
  const lastNamePlaceholderStyle = lastName
    ? cn(styles.last_name_placeholder, styles.touched_input)
    : styles.last_name_placeholder;
  const firstNameInputWrapper = errors?.firstName
    ? cn(styles.name_input_wrapper, styles.red_border)
    : styles.name_input_wrapper;
  const lastNameInputWrapper = errors?.lastName
    ? cn(styles.last_name_input_wrapper, styles.red_border)
    : styles.last_name_input_wrapper;

  function onSubmit({ firstName, lastName }) {
    setUserData({ ...userData, firstName, lastName });
  }

  return (
    <div data-test-id='auth'>
      <form className={styles.second_step_wrapper} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
        <div className={styles.steps}>2 шаг из 3</div>

        <div className={firstNameInputWrapper}>
          <input
            className={styles.name_input}
            type='text'
            {...register('firstName', {
              required: 'Поле не может быть пустым',
              onChange: (e) => setFirstName(e.target.value),
            })}
          />
          <span className={firstNamePlaceholderStyle}>Имя</span>
        </div>

        <div className={lastNameInputWrapper}>
          <input
            className={styles.last_name_input}
            type='text'
            {...register('lastName', {
              required: 'Поле не может быть пустым',
              onChange: (e) => setLastName(e.target.value),
            })}
          />
          <span className={lastNamePlaceholderStyle}>Фамилия</span>
        </div>

        <button disabled={!firstName && !lastName} className={styles.form_btn} type='submit'>
          Последний шаг
        </button>
      </form>
    </div>
  );
}
