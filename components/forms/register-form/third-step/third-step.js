import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import cn from 'classnames';
import { getUser } from '../../../../redux/slices/user-slice';
import { REGISTER_URL } from '../../../../constants/constants';
import { checkEmail, checkPhone } from '../../../../constants/reg-exp';
import styles from './third-step.module.scss';

export function ThirdStepRegistration({ userData, setUserData }) {
  const [email, setEmail] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const phone = getValues('phone');

  const phonePlaceholderStyle = phone ? cn(styles.phone_placeholder, styles.touched_input) : styles.phone_placeholder;
  const phoneWrapperStyle = errors?.phone
    ? cn(styles.phone_input_wrapper, styles.red_border)
    : styles.phone_input_wrapper;

  const emailPlaceholderStyle = email ? cn(styles.email_placeholder, styles.touched_input) : styles.email_placeholder;
  const emailWrapperStyle = errors?.email
    ? cn(styles.email_input_wrapper, styles.red_border)
    : styles.email_input_wrapper;

  function onSubmit({ phone, email }) {
    setUserData({ ...userData, phone, email });
    dispatch(getUser({ url: REGISTER_URL, userData: { ...userData, phone, email } }));
  }

  function checkPhonePrefix(value) {
    let prefix = 'XX';

    if (value) {
      prefix = value.slice(6, 8);
      if (prefix === '25' || prefix === '29' || prefix === '33' || prefix === '44') {
        return prefix;
      }
      prefix = 'XX';
    }
    return prefix;
  }

  return (
    <div>
      <form className={styles.third_step_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.steps}>3 шаг из 3</div>

        <div className={phoneWrapperStyle}>
          <Controller
            name='phone'
            control={control}
            rules={{
              required: true,
              validate: {
                prefixError: (v) => checkPhonePrefix(v) !== 'XX',
                phoneNumError: (v) => v.match('x'),
              },
            }}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <MaskedInput
                name={name}
                mask={checkPhone}
                value={value}
                className={styles.phone_input}
                type='tel'
                placeholderChar='x'
                guide={true}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
          <span className={phonePlaceholderStyle}>Телефон</span>
          <span className={errors?.phone ? cn(styles.error, styles.gray) : styles.gray}>
            В формате +375 (xx) xxx-xx-xx
          </span>
        </div>

        <div className={emailWrapperStyle}>
          <input
            className={styles.email_input}
            type='email'
            {...register('email', {
              required: true,
              pattern: {
                value: checkEmail,
                message: 'Введите корректный e-mail',
              },
              onChange: (e) => setEmail(e.target.value),
            })}
          />
          <span className={emailPlaceholderStyle}>E-mail</span>
          {errors?.email && (
            <span className={styles.error}>{errors?.email?.message || 'Введите корректный e-mail'}</span>
          )}
        </div>

        <button disabled={!email} className={styles.form_btn} type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
