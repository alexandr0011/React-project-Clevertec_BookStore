import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Burger } from '../burger/burger';
import { removeUser } from '../../redux/slices/user-slice';
import avatarImg from '../../resources/img/avatar.png';
import cleverlandLogo from '../../resources/img/logo.png';

import styles from './header.module.scss';

// const USER_NAME = localStorage.getItem('userName');

export function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // const TransformUserName = USER_NAME ? USER_NAME.charAt(0).toUpperCase() + USER_NAME.slice(1) : 'User';
  const dispatch = useDispatch();

  const userMenuStyle = isUserMenuOpen ? cn(styles.user_menu, styles.user_menu_show) : styles.user_menu;

  function userMenuToggle() {
    setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
  }

  function logOutUser() {
    dispatch(removeUser());
  }

  return (
    <header className={isUserMenuOpen ? styles.header_shadow : ''}>
      <div className={styles.header_wrapper}>
        <img className={styles.logo} src={cleverlandLogo} alt='Cleverland logo' />
        <Burger />
        <div className={styles.title}>
          <h1>Библиотека</h1>
        </div>
        <div className={styles.person}>
          <label htmlFor='userMenuCheckBox'>
            <p>Привет, User!</p>
            <img src={avatarImg} alt='avatar' />
          </label>
          <input type='checkbox' id='userMenuCheckBox' checked={isUserMenuOpen} onChange={userMenuToggle} />
          <div className={userMenuStyle}>
            <ul className={styles.user_menu_wrapper}>
              <li>
                <NavLink>Профиль</NavLink>
              </li>
              <li>
                <NavLink onClick={() => logOutUser()}>Выход</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
