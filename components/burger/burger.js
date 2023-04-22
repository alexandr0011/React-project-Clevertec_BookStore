import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { NavigationList } from '../navigation-list/navigation-list';
import { removeUser } from '../../redux/slices/user-slice';

import styles from './burger.module.scss';

export function Burger() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [burgerClass, setBurgerClass] = useState(cn(styles.burger_btn_item, styles.unclicked));
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const dispatch = useDispatch();

  const accordionStyles = isAccordionOpen ? cn(styles.burger_backdrop, styles.scroll) : styles.burger_backdrop;
  const burgerMenuStyles = isOpenMenu ? styles.burger_backdrop : cn(styles.burger_backdrop, styles.hide);

  function updateMenu() {
    if (isOpenMenu) {
      setBurgerClass(cn(styles.burger_btn_item, styles.unclicked));
    } else {
      setBurgerClass(cn(styles.burger_btn_item, styles.clicked));
    }

    setIsOpenMenu((isOpenMenu) => !isOpenMenu);
  }

  function closeBurgerHandler() {
    setIsOpenMenu(false);
    setBurgerClass(cn(styles.burger_btn_item, styles.unclicked));
  }

  function checkAccordionState(boolean) {
    setIsAccordionOpen(boolean);
  }

  function clickHandler(e) {
    const { className } = e.target;

    if (className === styles.burger_background) {
      closeBurgerHandler();
    }
  }

  function logOutHandler() {
    dispatch(removeUser());
  }

  useEffect(() => {
    if (isOpenMenu) {
      window.addEventListener('click', clickHandler);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('click', clickHandler);
      document.body.style.overflow = '';
    };
  });

  return (
    <div className={styles.burger_wrapper}>
      <button data-test-id='button-burger' type='button' onClick={updateMenu} className={styles.burger_menu}>
        <div className={burgerClass} />
        <div className={burgerClass} />
        <div className={burgerClass} />
      </button>

      <div className={isOpenMenu ? styles.burger_background : cn(styles.burger_background, styles.none)}>
        <div data-test-id='burger-navigation' className={burgerMenuStyles && accordionStyles}>
          <NavigationList
            closeBurgerHandler={() => closeBurgerHandler()}
            checkAccordionState={(boolean) => checkAccordionState(boolean)}
            booksStoreTestId='burger-showcase'
            categoryBooksTestId='burger-'
            termsTestId='burger-terms'
            contactsTestId='burger-contract'
            categoriesBookCount='burger-book-count-for-'
          />
          <div className={styles.account_links_wrapper}>
            <ul>
              <li>
                <a href='/'>Профиль</a>
              </li>
              <li>
                <NavLink data-test-id="exit-button" onClick={() => logOutHandler()}>Выход</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
