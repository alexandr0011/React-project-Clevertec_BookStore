import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getCategories } from '../../redux/slices/categories-slice';
import { ErrorComponent } from '../error-component/error-component';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Loader } from '../loader/loader';

import styles from './layout.module.scss';

export function Layout() {
  const categories = useSelector((state) => state.categories);
  const books = useSelector((state) => state.books);
  const book = useSelector((state) => state.book)
  const dispatch = useDispatch();
  const error = (categories.error || books.error) && <ErrorComponent />;
  const loading = (categories.loading || books.loading || book.loading) && <Loader />;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={styles.app_wrapper}>
      <div className={styles.app_container}>
        <Header />
        {error}
        {loading}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
