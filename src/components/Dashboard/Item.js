import React from 'react';

import styles from './styles.less';

const Item = ({
  url, title, isFolder, ...props
}) => {
  if (isFolder) {
    return (
      <a className={[styles.itemContainer, styles.folder, 'fadeIn animated'].join(' ')} onClick={() => props.goToFolder(props.children)}>
        <div className={styles.icon}>{ title.charAt(0).toUpperCase() }</div>
        <div className={styles.title}>{ title }</div>
      </a>
    );
  } else {
    const { meta = {} } = props;

    return (
      <a href={url} className={`${styles.itemContainer} fadeIn animated`}>
        <div
          className={meta.image ? styles.image : styles.icon}
        >
          {
          meta.image
          ? <img src={meta.image} alt={title.charAt(0).toUpperCase()} />
          : title.charAt(0).toUpperCase()
        }
        </div>
        <div className={styles.title}>{ title }</div>
      </a>
    );
  }
};

export default Item;
