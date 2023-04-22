import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ForgotPasswordComponent } from './forgot-pass-component/forgot-pass-component';
import { PasswordRecoveryComponent } from './password-recovery-component/password-recovery-component';
import { SendEmailMessage } from './send-email-message/send-email-message';
import { FormNotification } from '../form-notification/form-notification';
import { closeError, changePasswordSucccess } from '../../../redux/slices/user-slice';

export function ForgotPassForm() {
  const { isPasswordRecovery, isNewPasswordAdded, error } = useSelector((state) => state.user);
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function successfullyChangePasHandler() {
    dispatch(changePasswordSucccess());
    navigate('/auth', { replace: true });
  }

  function tryAgainHandler() {
    dispatch(closeError());
  }

  return (
    <>
      {!isPasswordRecovery && !search && <ForgotPasswordComponent requestError={error} />}
      {!error && isPasswordRecovery && <SendEmailMessage />}
      {search && !error && !isNewPasswordAdded && <PasswordRecoveryComponent replacePassCode={search.substring(6)} />}
      {isNewPasswordAdded ? (
        <FormNotification
          title='Новые данные сохранены'
          message='Зайдите в личный кабинет, используя свои логин и новый пароль'
          textBtn='Вход'
          notificationBtnHandler={() => successfullyChangePasHandler()}
        />
      ) : null}
      {error && error !== 400 && (
        <FormNotification
          title='Данные не сохранились'
          message='Что-то пошло не так. Попробуйте ещё раз'
          textBtn='Повторить'
          notificationBtnHandler={() => tryAgainHandler()}
        />
      )}
    </>
  );
}
