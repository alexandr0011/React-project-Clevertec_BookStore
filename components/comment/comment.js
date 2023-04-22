import cn from 'classnames';

import defaultAvatar from '../../resources/img/default_reviewer_avatar.png';

import { CommentRating } from './comment-rating/comment-rating';

import styles from './comment.module.scss';

export function Comments({ comments, isAccordionOpen }) {

  function getCommentDate(string) {
    const date = string.slice(0, 10);
    const reverse = date.split('-').reverse().join(' ');
    const month = reverse.slice(3, 5);
    let monthStr;

    switch (month) {
      case '01':
        monthStr = 'Январь';
        break;
      case '02':
        monthStr = 'Февраль';
        break;
      case '03':
        monthStr = 'Март';
        break;
      case '04':
        monthStr = 'Апрель';
        break;
      case '05':
        monthStr = 'Май';
        break;
      case '06':
        monthStr = 'Июнь';
        break;
      case '07':
        monthStr = 'Июль';
        break;
      case '08':
        monthStr = 'Август';
        break;
      case '09':
        monthStr = 'Сентябрь';
        break;
      case '10':
        monthStr = 'Октябрь';
        break;
      case '11':
        monthStr = 'Ноябрь';
        break;
      case '12':
        monthStr = 'Декабрь';
        break;
    }

    const replaceData = reverse.replace(month, monthStr);

    return replaceData;
  }

  const commentItems = comments.map(({ id, rating, text, createdAt, user }) => (
    <div key={id} className={styles.comment_item}>
      <div className={styles.comment_item_header}>
        <div>
          <img
            src={user.avatarUrl ? ` https://strapi.cleverland.by${user.avatarUrl}` : defaultAvatar}
            alt='review avatar'
          />
        </div>
        <div>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{getCommentDate(createdAt)}</div>
        </div>
      </div>
      <CommentRating rating={rating} />
      {text ? <div className={styles.comment_message}>{text}</div> : null}
    </div>
  ));

  return <div className={isAccordionOpen ? styles.wrapper : cn(styles.wrapper, styles.hide)}>{commentItems}</div>;
}
