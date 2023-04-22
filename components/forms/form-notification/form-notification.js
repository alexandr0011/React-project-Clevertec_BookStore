import styles from './form-notification.module.scss';

export function FormNotification({ title, message, textBtn, notificationBtnHandler }) {
  return (
    <div className={styles.wrapper} data-test-id='auth'>
      <div data-test-id="status-block">
        <h1>{title}</h1>
        <p>{message}</p>
        <button onClick={notificationBtnHandler} type='button'>
          {textBtn}
        </button>
      </div>
    </div>
  );
}
