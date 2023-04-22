import styles from './about-book.module.scss';

export function AboutBook({ categories, ISBN, producer, issueYear, pages, cover, format, weight, publish }) {
  return (
    <section className={styles.about_book_wrapper}>
      <div className={styles.about_book_title}>Подробная информация</div>
      <div className={styles.about_book_info_container}>
        <div className={styles.about_book_info_section}>
          <div className={styles.about_book_info_section_item}>
            <div>Издательство</div>
            <p>{publish}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>Год издания</div>
            <p>{issueYear}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>Страниц</div>
            <p>{pages}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>Переплет</div>
            <p>{cover}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>Формат</div>
            <p>{format}</p>
          </div>
        </div>
        <div className={styles.about_book_info_section}>
          <div className={styles.about_book_info_section_item}>
            <div>Жанр</div>
            <p>{categories}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>Вес</div>
            <p>{`${weight} г`}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>ISBN</div>
            <p>{ISBN}</p>
          </div>
          <div className={styles.about_book_info_section_item}>
            <div>Изготовитель</div>
            <p>{producer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
