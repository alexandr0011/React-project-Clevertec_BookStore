import { SOCIAL_NETWORKS } from '../../constants/constants';

import styles from './footer.module.scss';

export function Footer() {
  const socialLinks = SOCIAL_NETWORKS.map(({ id, name, link, img }) => (
    <li key={id}>
      <a href={link}>
        <img src={img} alt={name} />
      </a>
    </li>
  ));

  return (
    <footer>
      <div className={styles.footer_wrapper}>
        <div className={styles.сopyright}>
          <p>© 2020-2023 Cleverland. Все права защищены.</p>
        </div>
        <div className={styles.social_links}>
          <ul>{socialLinks}</ul>
        </div>
      </div>
    </footer>
  );
}
