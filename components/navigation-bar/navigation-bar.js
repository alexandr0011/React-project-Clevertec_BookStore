import { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import cross from '../../resources/svg/cross.svg';
import searchSvg from '../../resources/svg/search.svg';

import { FilterBtn } from './filter-btn/filter-btn';
import { ViewBtns } from './view-btns/view-btns';

import styles from './navigation-bar.module.scss';

export function NavigationBar({ viewType, onChangeViewHandler, searchInputText, setSearchInputText }) {
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  function toogleSearch() {
    setSearchIsOpen((searchIsOpen) => !searchIsOpen);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.search_filter_block}>
        <button data-test-id='button-search-open' className={styles.search_btn} type='button' onClick={toogleSearch}>
          <img src={searchSvg} alt='search' />
        </button>
        <div className={searchIsOpen ? styles.search_input : cn(styles.search_input, styles.hide)}>
          <input
            data-test-id='input-search'
            type='text'
            placeholder='Поиск книги или автора…'
            value={searchInputText}
            onChange={(e) => setSearchInputText(e.target.value)}
          />
          <a className={styles.search_link}>
            <div />
          </a>
          <button data-test-id='button-search-close' type='button' onClick={toogleSearch} className={styles.cross_btn}>
            <img src={cross} alt='cancel' />
          </button>
        </div>
        <FilterBtn />
      </div>
      <ViewBtns viewType={viewType} onChangeViewHandler={onChangeViewHandler} />
    </nav>
  );
}

NavigationBar.propTypes = {
  viewType: PropTypes.string,
  onChangeViewHandler: PropTypes.func,
  searchInputText: PropTypes.string,
  setSearchInputText: PropTypes.func,
};
