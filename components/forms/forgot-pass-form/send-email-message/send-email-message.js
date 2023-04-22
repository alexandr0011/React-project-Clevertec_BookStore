import styles from './send-email-message.module.scss';

export function SendEmailMessage() {
    return(
        <div className={styles.message} data-test-id="auth">
            <div className={styles.wrapper} data-test-id="status-block">
                <h1>Письмо выслано</h1>
                <p>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
            </div>
        </div>
    )
}