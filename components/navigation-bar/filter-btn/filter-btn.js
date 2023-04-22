import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ratingFilter } from '../../../redux/slices/books-slice';
import sortDownSvg from '../../../resources/svg/sort_down.svg';
import sortUpSvg from '../../../resources/svg/sort_up.svg';

import styles from './filter-btn.module.scss';

const FILTER_ID = 'filter';

export function FilterBtn() {
  const [sortIsChecked, setIsSortChecked] = useState(false);
  const dispatch = useDispatch();

  function sortHandler() {
    setIsSortChecked((sortIsChecked) => !sortIsChecked);
    dispatch(ratingFilter(sortIsChecked));
  }

  return (
    <div className={styles.filter}>
      <input type='checkbox' id={FILTER_ID} checked={sortIsChecked} onChange={sortHandler} />
      <label htmlFor={FILTER_ID} data-test-id='sort-rating-button'>
        <img src={sortIsChecked ? sortDownSvg : sortUpSvg} alt='filter btn' />
        <p>По рейтингу</p>
      </label>
    </div>
  );
}
