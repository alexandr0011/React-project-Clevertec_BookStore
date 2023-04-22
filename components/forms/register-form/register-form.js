import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FirstStepRegistration } from './first-step/first-step';
import { SecondStepRegistration } from './second-step/second-step';
import { ThirdStepRegistration } from './third-step/third-step';
import { FormNotification } from '../form-notification/form-notification';
import { closeError } from '../../../redux/slices/user-slice';
import arrowImg from '../../../resources/img/login_arrow.png';
import styles from './register-form.module.scss';

export function RegisterForm() {
  const [userData, setUserData] = useState({});
  const { error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getStep({ username, firstName }) {
    const commonProps = {
      userData,
      setUserData,
    };

    if (firstName) {
      return <ThirdStepRegistration {...commonProps} />;
    }
    if (username) {
      return <SecondStepRegistration {...commonProps} />;
    }
    return <FirstStepRegistration {...commonProps} />;
  }

  function backToRegisterHandler() {
    dispatch(closeError());
  }

  function successfullyRegistrationHandler() {
    navigate('/auth', { replace: true });
  }

  const emailIsNotUnique = error === 400 && (
    <FormNotification
      title='Данные не сохранились'
      message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
      textBtn='Назад к регистрации'
      notificationBtnHandler={() => backToRegisterHandler()}
    />
  );

  const registrationError = error && error !== 400 && (
    <FormNotification
      title='Данные не сохранились'
      message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
      textBtn='Повторить'
      notificationBtnHandler={() => backToRegisterHandler()}
    />
  );

  const registrationSuccessfully = user.username && (
    <FormNotification
      title='Регистрация успешна'
      message='Регистрация прошла успешно. Зайдите в личный кабинет, исспользуя свои логин и пароль'
      textBtn='Вход'
      notificationBtnHandler={() => successfullyRegistrationHandler()}
    />
  );

  const registerForm =
    !error && !user.username ? (
      <div className={styles.form} >
        <div className={styles.form_wrapper}>
          <h1>Регистрация</h1>

          {getStep(userData)}

          <div className={styles.login_block}>
            <p>Есть учетная запись?</p>
            <NavLink to='/auth'>
              Войти
              <img src={arrowImg} alt='LogIn' />
            </NavLink>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      {emailIsNotUnique}
      {registrationError}
      {registrationSuccessfully}
      {registerForm}
    </>
  );
}
