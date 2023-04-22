import styles from './search-notification.module.scss';

export function SearchNotification({ message, testId }) {
  return (
    <div className={styles.message_wrapper} data-test-id={testId}>
      <h2>{message}</h2>
    </div>
  );
}
