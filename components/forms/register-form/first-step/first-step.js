import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import {
  checkStringToLatinAndNum,
  checkStringToUpperAndNum,
  checkLatinInStr,
  checkCyrilicInStr,
  checkNumInStr,
  checkNumInPassword,
  checkUpperInStr,
} from '../../../../constants/reg-exp';
import passwordCheckImg from '../../../../resources/img/password_check.png';
import closedEyeImg from '../../../../resources/img/eye_closed.png';
import openedEyeImg from '../../../../resources/img/eye_opened.png';
import styles from './first-step.module.scss';

const schema = yup.object().shape({
  username: yup.string().required().matches(checkStringToLatinAndNum),
  password: yup.string().required().matches(checkStringToUpperAndNum).min(8),
});

export function FirstStepRegistration({ userData, setUserData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const loginPlaceholderStyle = userName
    ? cn(styles.login_placeholder, styles.touched_input)
    : styles.login_placeholder;
  const loginWrapperStyle = errors?.username
    ? cn(styles.login_input_wrapper, styles.red_border)
    : styles.login_input_wrapper;
  const loginHintStyle = errors?.username ? cn(styles.login_hint, styles.error) : styles.login_hint;
  const loginNotLatinHintStyle = checkCyrilicInStr.test(userName) || userName.match(checkNumInStr) ? styles.error : '';
  const loginNotNumHintStyle = userName.match(checkLatinInStr) || checkCyrilicInStr.test(userName) ? styles.error : '';

  const passwordPlaseholderStyle = password
    ? cn(styles.password_placeholder, styles.touched_input)
    : styles.password_placeholder;
  const passwordWrapperStyle = errors?.password
    ? cn(styles.password_input_wrapper, styles.red_border)
    : styles.password_input_wrapper;
  const passwordHintStyle = errors?.password ? cn(styles.password_hint, styles.error) : styles.password_hint;
  const passwordHintLengthStyle = password && password.length < 8 ? styles.error : '';
  const passwordHintUpperStyle = password.match(checkUpperInStr) ? styles.error : '';
  const passwordNotNumHintStyle = !password || password.match(checkNumInPassword) ? '' : styles.error;
  const passwordCheckImgStyle =
    password.length > 7 && password.match(checkStringToUpperAndNum)
      ? cn(styles.password_check_img, styles.show_password_check)
      : styles.password_check_img;

  function togglePassword() {
    setShowPassword((showPassword) => !showPassword);
  }

  function onSubmit({ username, password }) {
    setUserData({ ...userData, username, password });
  }

  return (
    <div data-test-id='auth'>
      <form className={styles.first_step_wrapper} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
        <div className={styles.steps}>1 шаг из 3</div>

        <div className={loginWrapperStyle}>
          <input
            className={styles.login_input}
            type='text'
            {...register('username', {
              onChange: (e) => setUserName(e.target.value),
            })}
          />
          <span className={loginPlaceholderStyle}>Придумайте логин для входа</span>
          <div className={loginHintStyle} data-test-id='hint'>
            Используйте для логина
            <span className={loginNotLatinHintStyle}> латинский алфавит</span> и
            <span className={loginNotNumHintStyle}> цифры</span>
            
          </div>
        </div>

        <div className={passwordWrapperStyle}>
          <input
            className={styles.password_input}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              onChange: (e) => setPassword(e.target.value),
            })}
          />
          <span className={passwordPlaseholderStyle}>Пароль</span>
          {!errors?.password && password && <img data-test-id='checkmark' className={passwordCheckImgStyle} src={passwordCheckImg} alt='correct password' />}
          <div className={passwordHintStyle} data-test-id='hint'>
            Пароль не менее
            <span className={passwordHintLengthStyle}> 8 символов</span>,
            <span className={passwordHintUpperStyle}> с заглавной буквой</span> и
            <span className={passwordNotNumHintStyle}> цифрой</span>
          </div>
        </div>

        <label className={styles.checkbox_label} htmlFor='register_checkbox'>
          <input
            id='register_checkbox'
            type='checkbox'
            checked={showPassword}
            onChange={togglePassword}
          />
          <img
            data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
            className={password ? cn(styles.eye, styles.show_eye) : styles.eye}
            src={showPassword ? openedEyeImg : closedEyeImg}
            alt='show password'
          />
        </label>

        <button className={styles.form_btn} type='submit'>
          Следующий шаг
        </button>
      </form>
    </div>
  );
}
