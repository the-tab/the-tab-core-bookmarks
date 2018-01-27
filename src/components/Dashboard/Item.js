import React from 'react';

import styles from './styles.less';

const Item = ({
  url, title, icon, isFolder, ...props
}) => {
  if (isFolder) {
    return (
      <a className={[styles.itemContainer, styles.folder, 'fadeIn animated'].join(' ')} onClick={() => props.goToFolder(props.children)}>
        <div className={styles.icon}>{ title.charAt(0).toUpperCase() }</div>
        <div className={styles.title}>{ title }</div>
      </a>
    );
  } else {
    return (
      <a href={url} className={`${styles.itemContainer} fadeIn animated`}>
        <div
          className={styles.image}
        >
          <img src={icon} className="fadeIn animated" />
        </div>
        <div className={styles.title}>{ title }</div>
      </a>
    );
  }
};

export default Item;
