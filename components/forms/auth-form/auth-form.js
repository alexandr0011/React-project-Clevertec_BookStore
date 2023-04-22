import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { closeError, getUser } from '../../../redux/slices/user-slice';
import { FormNotification } from '../form-notification/form-notification';
import arrowImg from '../../../resources/img/login_arrow.png';
import closedEyeImg from '../../../resources/img/eye_closed.png';
import openedEyeImg from '../../../resources/img/eye_opened.png';
import styles from './auth-form.module.scss';

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAutorization } = useSelector((state) => state.user);

  const loginWrapperStyle = errors?.identifier
    ? cn(styles.login_input_wrapper, styles.red_border)
    : styles.login_input_wrapper;
  const passwordWrapperStyle = errors?.password
    ? cn(styles.password_input_wrapper, styles.red_border)
    : styles.password_input_wrapper;

  function onSubmit(userData) {
    dispatch(getUser(userData));
  }

  function togglePassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  function notificationBtnHandler() {
    dispatch(closeError());
  }

  useEffect(() => {
    if (isAutorization) {
      navigate('/books/all', { replace: true });
    }
  }, [navigate, isAutorization]);

  return error && error !== 400 ? (
    <FormNotification
      title='Вход не выполнен'
      message='Что-то пошло не так. Попробуйте еще раз'
      textBtn='Повторить'
      notificationBtnHandler={() => notificationBtnHandler()}
    />
  ) : (
    <div className={styles.form} data-test-id='auth'>
      <h1>Вход в личный кабинет</h1>
      <form onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form' className={styles.form_wrapper}>
        <div className={loginWrapperStyle}>
          <input
            className={styles.login_input}
            type='text'
            {...register('identifier', {
              required: true,
              onChange: (e) => setLogin(e.target.value),
            })}
          />
          <span className={login && styles.touched_input}>Логин</span>
        </div>
        <div className={passwordWrapperStyle}>
          <input
            className={styles.password_input}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: true,
              onChange: (e) => setPassword(e.target.value),
            })}
          />
          <span className={password && styles.touched_input}>Пароль</span>
        </div>

        <label className={styles.checkbox_label} htmlFor='auth_checkbox'>
          <input id='auth_checkbox' type='checkbox' checked={showPassword} onChange={togglePassword} />
          {password && (
            <img
              data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
              className={password ? cn(styles.eye, styles.show_eye) : styles.eye}
              src={showPassword ? openedEyeImg : closedEyeImg}
              alt='show password'
            />
          )}
        </label>
        <div className={styles.hint}>
          <NavLink to='/forgot-pass'>
            {error === 400 ? (
              <div className={cn(styles.error, styles.restore_hint)} data-test-id='hint'>
                Неверный логин или пароль! <span className={styles.restore}>Восстановить?</span>
              </div>
            ) : (
              <span>Забыли логин или пароль?</span>
            )}
          </NavLink>
        </div>
        <button className={styles.auth_btn} type='submit'>
          Вход
        </button>
        <div className={styles.registration_block}>
          <p>Нет учётной записи?</p>
          <NavLink to='/registration'>
            Регистрация
            <img src={arrowImg} alt='registration' />
          </NavLink>
        </div>
      </form>
    </div>
  );
}
