import defaultBookImg from '../../resources/img/default_book_preview.png';
import { Slider } from '../slider/slider';

import styles from './book-preview.module.scss';

export function BookPreview({ description, author, title, img }) {
  const bookImg = (
    <div>
      <img src={!img?.length ? defaultBookImg : `https://strapi.cleverland.by${img[0].url}`} alt='book preview' />
    </div>
  );

  return (
    <section className={styles.book_info}>
      <div className={styles.container}>
        <div className={styles.book_img}>{img?.length > 1 ? <Slider img={img} /> : bookImg}</div>
        <div className={styles.book_content}>
          <div data-test-id='book-title' className={styles.book_title}>
            {title}
          </div>
          <div className={styles.book_author}>{author}</div>
          <button className={styles.btn} type='button'>
            Забронировать
          </button>
          <div className={styles.about_book_container}>
            <div className={styles.about_book_placeholder}>О книге</div>
            <div className={styles.book_description}>{description}</div>
          </div>
        </div>
      </div>
      <div className={styles.about_book_container_mobile}>
        <div className={styles.about_book_placeholder}>О книге</div>
        <div className={styles.book_description}>{description}</div>
      </div>
    </section>
  );
}
