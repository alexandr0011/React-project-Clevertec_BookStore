import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CardBook } from '../../components/card-book/card-book';
import { ErrorComponent } from '../../components/error-component/error-component';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { SearchNotification } from '../../components/search-notification/search-notification';
import { VIEW_TYPE_TILE } from '../../constants/constants';
import { getBooks } from '../../redux/slices/books-slice';

import styles from './books-page.module.scss';

export function BooksPage() {
  const [viewType, setViewType] = useState(VIEW_TYPE_TILE);
  const [searchInputText, setSearchInputText] = useState('');
  const { category } = useParams();
  const { books, error } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const selectedСategory = categories.find((item) => item.path === category);

  function getFiltredBooks(category, searchString) {
    if (category) {
      return books
        .filter((book) => book.categories.includes(category))
        .filter((book) => !searchString || book.title.toLowerCase().includes(searchString.toLowerCase()));
    }

    return books.filter((book) => !searchString || book.title.toLowerCase().includes(searchString.toLowerCase()));
  }

  function onChangeViewHandler(view) {
    setViewType(view);
  }

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch, category]);

  const cards = getFiltredBooks(selectedСategory?.name, searchInputText).map((book) => (
    <CardBook
      key={book.id}
      viewType={viewType}
      id={book.id}
      img={book.image}
      rating={book.rating}
      title={book.title}
      authors={book.authors}
      year={book.issueYear}
      filter={searchInputText}
      category={category}
    />
  ));

  function getContent() {
    if (searchInputText && !cards.length) {
      return <SearchNotification message='По запросу ничего не найдено' testId='search-result-not-found' />;
    }

    if (!cards.length) {
      return <SearchNotification message='В этой категории книг ещё нет' testId='empty-category' />;
    }

    return cards;
  }

  return error ? (
    <ErrorComponent />
  ) : (
    <section className={styles.books_page_wrapper}>
      <NavigationBar
        viewType={viewType}
        onChangeViewHandler={(view) => onChangeViewHandler(view)}
        searchInputText={searchInputText}
        setSearchInputText={setSearchInputText}
      />
      <section className={viewType === VIEW_TYPE_TILE ? styles.content_wrapper : styles.content_wrapper_list}>
        {getContent()}
      </section>
    </section>
  );
}
