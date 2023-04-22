import { VIEW_TYPE_LIST, VIEW_TYPE_TILE } from '../../../constants/constants';
import { SvgCollection } from '../../../resources/svg/svg-collection';

import styles from './view-btns.module.scss';

export function ViewBtns({ viewType, onChangeViewHandler }) {
  return (
    <div className={styles.view_btn_block}>
      <input
        id={VIEW_TYPE_TILE}
        value={VIEW_TYPE_TILE}
        className={styles.tile_btn}
        type='radio'
        name='type-view'
        checked={viewType === VIEW_TYPE_TILE}
        onChange={(e) => onChangeViewHandler(e.target.value)}
      />
      <label className={styles.tile_btn_label} htmlFor={VIEW_TYPE_TILE}>
        <SvgCollection svgName='tile-btn-svg' />
      </label>
      <input
        id={VIEW_TYPE_LIST}
        value={VIEW_TYPE_LIST}
        className={styles.list_btn}
        type='radio'
        name='type-view'
        checked={viewType === VIEW_TYPE_LIST}
        onChange={(e) => onChangeViewHandler(e.target.value)}
      />
      <label className={styles.list_btn_label} htmlFor={VIEW_TYPE_LIST}>
        <SvgCollection svgName='list-btn-svg' />
      </label>
    </div>
  );
}