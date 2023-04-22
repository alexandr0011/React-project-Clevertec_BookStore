import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './bread-crumb.module.scss';

export function BreadCrumb({ categoryPath, title }) {
  const { categories } = useSelector((state) => state.categories);
  const selectedСategory = categories.find((item) => item.path === categoryPath) || {
    name: 'Все книги',
    path: 'all',
  };

  return (
    <section className={styles.books_nav}>
      <div className={styles.books_nav_wrapper}>
        <NavLink data-test-id='breadcrumbs-link' to={`../books/${categoryPath}`}>
          {selectedСategory.name}
        </NavLink>
        <span className={styles.separator}>/</span>
        <span data-test-id='book-name'>{title}</span>
      </div>
    </section>
  );
}
