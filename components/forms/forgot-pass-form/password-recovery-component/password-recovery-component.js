import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewUserPassword } from '../../../../redux/slices/user-slice';
import { checkStringToUpperAndNum, checkNumInPassword, checkUpperInStr } from '../../../../constants/reg-exp';
import passwordCheckImg from '../../../../resources/img/password_check.png';
import eyeOpenedImg from '../../../../resources/img/eye_opened.png';
import eyeClosedImg from '../../../../resources/img/eye_closed.png';
import styles from './password-recovery-component.module.scss';

const schema = yup.object().shape({
  password: yup.string().required().matches(checkStringToUpperAndNum).min(8),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null]),
});

export function PasswordRecoveryComponent({ replacePassCode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const passwordInputWrapperStyle = errors?.password
    ? cn(styles.password_input_wrapper, styles.red_border)
    : styles.password_input_wrapper;
  const passwordHintStyle = errors?.password ? cn(styles.hint, styles.error) : styles.hint;
  const passwordHintLengthStyle = password && password.length < 8 ? styles.error : '';
  const passwordHintUpperStyle = password.match(checkUpperInStr) ? styles.error : '';
  const passwordNotNumHintStyle = !password || password.match(checkNumInPassword) ? '' : styles.error;
  const passwordCheckImgStyle =
    password.length > 7 && password.match(checkStringToUpperAndNum)
      ? cn(styles.password_check_img, styles.show_password_check)
      : styles.password_check_img;

  const repeatPasswordInputWrapperStyle = errors?.passwordConfirmation
    ? cn(styles.repeat_password_input_wrapper, styles.red_border)
    : styles.repeat_password_input_wrapper;

  function showPasswordToggle() {
    setShowPassword((showPasword) => !showPasword);
  }

  function showRepeatPasswordToggle() {
    setRepeatShowPassword((showRepeatPasword) => !showRepeatPasword);
  }

  function onSubmit(data) {
    const newPasswordData = { ...data, code: replacePassCode };
    dispatch(addNewUserPassword(newPasswordData));
  }

  return (
    <div className={styles.form}>
      <div className={styles.wrapper}>
        <h1>Восстановление пароля</h1>
        <form className={styles.form_recovery} onSubmit={handleSubmit(onSubmit)} data-test-id="reset-password-form">
          <div className={passwordInputWrapperStyle}>
            <input
              className={styles.password_input}
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            <p className={password && styles.touched_input}>Новый пароль</p>

            <div className={passwordHintStyle} data-test-id="hint">
              Пароль
              <span className={passwordHintLengthStyle}> не менее 8 символов</span>,
              <span className={passwordHintUpperStyle}> с заглавной буквой</span> и
              <span className={passwordNotNumHintStyle}> цифрой</span>
            </div>
            {!errors?.password && password && <img data-test-id="checkmark" className={passwordCheckImgStyle} src={passwordCheckImg} alt='correct password' />}
            <label htmlFor='recovery_password_input_checkbox' className={styles.password_label}>
              <input
                type='checkbox'
                id='recovery_password_input_checkbox'
                checked={showPassword}
                onChange={showPasswordToggle}
              />
              <img
                data-test-id={showRepeatPassword ? 'eye-opened' : 'eye-closed'}
                className={styles.password_eye}
                src={showPassword ? eyeOpenedImg : eyeClosedImg}
                alt='show password'
              />
            </label>
          </div>
          <div className={repeatPasswordInputWrapperStyle}>
            <input
              className={styles.repeat_password_input}
              type={showRepeatPassword ? 'text' : 'password'}
              {...register('passwordConfirmation', {
                required: true,
                onChange: (e) => setRepeatPassword(e.target.value),
              })}
            />
            <span data-test-id="hint" className={repeatPassword && styles.touched_input}>Повторите пароль</span>
            {errors?.passwordConfirmation?.type === 'oneOf' && (
              <div data-test-id="hint" className={styles.confirm_password_error}>Пароли не совпадают</div>
            )}
            <label htmlFor='recovery_repeat_password_input_checkbox' className={styles.repeat_password_label}>
              <input
                type='checkbox'
                id='recovery_repeat_password_input_checkbox'
                checked={showRepeatPassword}
                onChange={showRepeatPasswordToggle}
              />
              <img 
                data-test-id={showRepeatPassword ? 'eye-opened' : 'eye-closed'}
                className={styles.repeat_password_eye}
                src={showRepeatPassword ? eyeOpenedImg : eyeClosedImg}
                alt='show password'
              />
            </label>
          </div>
          <button disabled={errors?.passwordConfirmation?.type === 'oneOf'} className={styles.form_btn} type='submit'>
            Сохранить изменения
          </button>
        </form>
        <div className={styles.form_hint}>После сохранения войдите в библиотеку, используя новый пароль</div>
      </div>
    </div>
  );
}
