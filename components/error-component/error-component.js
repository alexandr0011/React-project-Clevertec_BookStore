import { useDispatch } from 'react-redux';

import { closeBookError } from '../../redux/slices/book-slice';
import { closeBooksError } from '../../redux/slices/books-slice';
import { closeCategoriesError } from '../../redux/slices/categories-slice';
import crossImg from '../../resources/img/cross.png';
import negativeImg from '../../resources/img/negative.png';

import styles from './error-component.module.scss';

const ERROR_MESSAGE = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export function ErrorComponent() {

  const dispatch = useDispatch();

  function closeErrorHandler() {
    dispatch(closeCategoriesError())
    dispatch(closeBooksError())
    dispatch(closeBookError())
  }
  
  return (
    <div className={styles.wrapper} data-test-id='error'>
      <div className={styles.content}>
        <div>
          <img src={negativeImg} alt='error' />
          <h3>{ERROR_MESSAGE}</h3>
        </div>
        <button type='button' onClick={closeErrorHandler}>
          <img src={crossImg} alt='cancel' />
        </button>
      </div>
    </div>
  );
}
