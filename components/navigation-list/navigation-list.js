import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useMatch } from 'react-router-dom';

import { closeBooksError } from '../../redux/slices/books-slice';
import { closeCategoriesError } from '../../redux/slices/categories-slice';
import arrowSvg from '../../resources/svg/accordion_arrow.svg';

import styles from './navigation-list.module.scss';

export function NavigationList({
  closeBurgerHandler,
  checkAccordionState,
  booksStoreTestId,
  categoryBooksTestId,
  termsTestId,
  contactsTestId,
  categoriesBookCount
}) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const match = useMatch({
    path: 'books',
    end: false,
  });
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { books } = useSelector((state) => state.books);

  const activeLink = ({ isActive }) => (isActive ? styles.active_link : '');

  function onAccordionOpen() {
    setIsAccordionOpen((isAccordionOpen) => !isAccordionOpen);

    if (checkAccordionState) {
      checkAccordionState(!isAccordionOpen);
    }
  }

  function liftUpScreenHandler() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function clickHandler() {
    liftUpScreenHandler();
    setIsAccordionOpen(false);
    dispatch(closeBooksError());
    dispatch(closeCategoriesError());

    if (checkAccordionState) {
      checkAccordionState(false);
    }
  }

  function getCategoryCount(category) {
    return books.filter(book => book.categories.includes(category)).length
  }

  const booksCategorylinks = categories.map((category) => (
    <li key={category.id}>
      <NavLink
        data-test-id={`${categoryBooksTestId}${category.path}`}
        to={`books/${category.path}`}
        onClick={() => closeBurgerHandler && closeBurgerHandler()}
        className={({ isActive }) => `${isActive ? styles.book_category_link_active : ''}`}
      >
        {category.name} 
      </NavLink>
      <span data-test-id={`${categoriesBookCount}${category.path}`}>{getCategoryCount(category.name)}</span>
    </li>
  ));

  return (
    <nav className={styles.wrapper}>
      <ul className={styles.link_items}>
        <li className={!isAccordionOpen ? styles.main_menu_item : styles.main_menu_item_active}>
          <NavLink to='books/all' className={match ? styles.active_accordion_title : ''}>
            <button
              data-test-id={booksStoreTestId}
              type='button'
              className={styles.accordion_btn}
              onClick={onAccordionOpen}
            >
              <span>Витрина книг</span>
              <img src={arrowSvg} alt='accordion btn' />
            </button>
          </NavLink>
        </li>
        <ul className={!isAccordionOpen ? styles.list_items : styles.list_items_active}>
          <li>
            <NavLink
              data-test-id={`${categoryBooksTestId}books`}
              to='books/all'
              onClick={() => closeBurgerHandler && closeBurgerHandler()}
              className={({ isActive }) => `${isActive ? styles.book_category_link_active : ''}`}
            >
              Все книги
            </NavLink>
          </li>
          {booksCategorylinks}
        </ul>
        <li className={styles.main_menu_item}>
          <NavLink data-test-id={termsTestId} onClick={() => clickHandler()} to='terms' className={activeLink}>
            Правила пользования
          </NavLink>
        </li>
        <li className={styles.main_menu_item}>
          <NavLink data-test-id={contactsTestId} onClick={() => clickHandler()} to='agreements' className={activeLink}>
            Договор оферты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
