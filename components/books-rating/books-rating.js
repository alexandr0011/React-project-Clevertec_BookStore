import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { SvgCollection } from '../../resources/svg/svg-collection';

import styles from './books-rating.module.scss';

const STARS = 5;

export function BooksRating({ id, rating }) {
  const [booksRating, setBooksRating] = useState(Math.round(rating));
  const starItems = [];

  function onChangeRating(newRating) {
    setBooksRating(newRating);
  }

  useEffect(() => {
    setBooksRating(Math.round(rating));
  }, [rating]);

  for (let i = 1; i <= STARS; i++) {
    starItems.unshift(
      <Fragment key={i}>
        <input
          type='radio'
          id={`${id}rating_${i}`}
          value={i}
          className={styles.rating_item}
          name={`${id}rating`}
          onChange={(e) => onChangeRating(+e.target.value)}
          checked={booksRating === i}
        />
        <label htmlFor={`${id}rating_${i}`} className={styles.rating_label}>
          <SvgCollection svgName='books-rating-svg' />
        </label>
      </Fragment>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rating_items}>{starItems}</div>
    </div>
  );
}

BooksRating.propTypes = {
  id: PropTypes.number,
  rating: PropTypes.number,
};
