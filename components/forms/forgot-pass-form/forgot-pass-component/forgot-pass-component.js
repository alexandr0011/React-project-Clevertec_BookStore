import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { passwordRecovery } from '../../../../redux/slices/user-slice';
import { checkEmail } from '../../../../constants/reg-exp';
import loginArrowLeftImg from '../../../../resources/img/login_arrow_left.png';
import loginArrowRightImg from '../../../../resources/img/login_arrow.png';
import styles from './forgot-pass-component.module.scss';

export function ForgotPasswordComponent({requestError}) {
  const [email, setEmail] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();

  const emailPlaceholderStyle = email ? cn(styles.email_placeholder, styles.touched_input) : styles.email_placeholder;
  const emailWrapperStyle = errors?.email
    ? cn(styles.email_input_wrapper, styles.red_border)
    : styles.email_input_wrapper;

  function formSubmit(data) {
    dispatch(passwordRecovery(data));
  }

  return (
    <div className={styles.form} data-test-id='auth'>
      <div className={styles.form_header}>
        <NavLink to='/auth'>
          <img src={loginArrowLeftImg} alt='logIn' />
          <p>Вход в личный кабинет</p>
        </NavLink>
      </div>
      <div className={styles.form_wrapper}>
        <h1>Восстановление пароля</h1>
        <form className={styles.recovery_password_form} onSubmit={handleSubmit(formSubmit)} data-test-id="send-email-form">
          <div className={emailWrapperStyle}>
            <input
              type='email'
              className={styles.email_input}
              {...register('email', {
                required: true,
                pattern: {
                  value: checkEmail,
                  message: 'Введите корректный e-mail',
                },
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            <span className={emailPlaceholderStyle}>Email</span>
            {errors?.email && <span className={styles.error} data-test-id="hint">{errors?.email?.message}</span>}
            {requestError && <span className={styles.error} data-test-id="hint">error</span>}
            <div className={styles.input_hint} data-test-id="hint">
              На этот email будет отправлено письмо с инструкциями по восстановлению пароля
            </div>
          </div>
          <button className={styles.btn_submit} type='submit'>
            Восстановить
          </button>
        </form>
        <div className={styles.registration_block}>
          <p>Нет учётной записи?</p>
          <NavLink to='/registration'>
            Регистрация <img src={loginArrowRightImg} alt='registration' />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
