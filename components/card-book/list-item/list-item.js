import { Link } from 'react-router-dom';

import defaultListImg from '../../../resources/img/default_card_list_img.png';
import { BooksRating } from '../../books-rating/books-rating';

import styles from './list-item.module.scss';

export function ListItem({ id, img, title, authors, rating, year, category }) {
  function getAuthorString(authors, year) {
    if (authors[1]) {
      return `${authors[0]}, ${authors[1]}, ${year}`;
    }

    return `${authors[0]}, ${year}`;
  }

  return (
    <Link to={`books/../../${category}/${id}`}>
      <div className={styles.card_list_wrapper}>
        <div className={styles.list_book_img}>
          <img src={img ? `https://strapi.cleverland.by${img.url}` : defaultListImg} alt='img' />
        </div>
        <div className={styles.content_card_list}>
          <div className={styles.book_list_title}>{title}</div>
          <div className={styles.book_list_author}>{getAuthorString(authors, year)}</div>
          <div className={styles.list_container}>
            <div className={styles.book_list_rating}>
              {rating ? <BooksRating id={id} rating={rating} /> : 'ещё нет оценок'}
            </div>
            <div className={styles.book_list_btn}>
              <button className={styles.card_list_btn} type='button'>
                Забронировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
