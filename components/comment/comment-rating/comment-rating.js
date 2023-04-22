import PropTypes from 'prop-types';

import { SvgCollection } from '../../../resources/svg/svg-collection';

import styles from './comment-rating.module.scss';

const STARS = 5;

export function CommentRating({ rating }) {
  const starBackdrop = [];
  const starItems = [];

  for (let i = 1; i <= STARS; i++) {
    starBackdrop.push(<SvgCollection key={i} svgName='comment-rating-svg' />);
  }

  for (let i = 1; i <= rating; i++) {
    starItems.unshift(<SvgCollection key={i} svgName='comment-rating-svg' />);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backdrop}>{starBackdrop}</div>
      <div className={styles.stars}>{starItems}</div>
    </div>
  );
}

CommentRating.propTypes = {
  rating: PropTypes.number,
};
