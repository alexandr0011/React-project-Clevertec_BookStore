import { useState, Fragment } from 'react';
import cn from 'classnames';

import chevronImg from '../../resources/img/review_chevron.png';
import { Comments } from '../comment/comment';

import styles from './book-reviews.module.scss';

export function BookReviews({ comments }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  function accordionHandler() {
    setIsAccordionOpen((isAccordionOpen) => !isAccordionOpen);
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.title_wrapper}>
        <div className={styles.title}>
          Отзывы
          <span>{comments?.length || 0}</span>
        </div>
        {comments?.length && (
          <button
            data-test-id='button-hide-reviews'
            type='button'
            onClick={accordionHandler}
            className={isAccordionOpen ? cn(styles.title_btn, styles.btn_revert) : styles.title_btn}
          >
            <img src={chevronImg} alt='show reviews' />
          </button>
        )}
      </div>

      {comments?.length && (
        <Fragment>
          <div className={styles.reviews_title_border} />
          <Comments comments={comments} isAccordionOpen={isAccordionOpen} />
        </Fragment>
      )}
      <div className={styles.btn_wrapper}>
        <button data-test-id='button-rating' className={styles.review_btn} type='button'>
          Оценить книгу
        </button>
      </div>
    </section>
  );
}
