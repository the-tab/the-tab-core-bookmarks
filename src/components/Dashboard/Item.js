import React from 'react';

import LongPress from '../LongPress';
import styles from './styles.less';

const Item = ({
  url, title, icon, isFolder, ...props
}) => {
  if (isFolder) {
    return (
      <LongPress
        htmlElement="div"
        className={[styles.itemContainer, styles.folder, 'fadeIn animated'].join(' ')}
        onClick={() => props.goToFolder(props.children)}
        onLongPress={props.onLongPress}
      >
        <div className={styles.icon}>{ title.charAt(0).toUpperCase() }</div>
        <div className={styles.title}>{ title }</div>
      </LongPress>
    );
  } else {
    return (
      <LongPress
        htmlElement="a"
        href={url}
        className={`${styles.itemContainer} fadeIn animated`}
        onLongPress={props.onLongPress}
      >
        <div className={styles.image}>
          <img src={icon} className="fadeIn animated" />
        </div>
        <div className={styles.title}>{ title }</div>
      </LongPress>
    );
  }
};

export default Item;
