import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Loader } from '../loader/loader';
import styles from './layout-auth-page.module.scss';

export function LayoutAuthPage() {
  const { loading } = useSelector((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>Cleverland</div>
      {loading && <Loader />}
      <Outlet/>
    </div>
  );
}
