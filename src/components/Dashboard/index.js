import React, { Component } from 'react';

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
    return (
      <a href={url} className={`${styles.itemContainer} fadeIn animated`}>
        <div className={styles.icon}>{ title.charAt(0).toUpperCase() }</div>
        <div className={styles.title}>{ title }</div>
      </a>
    );
  }
};

export default class Dashobard extends Component {
  state = {
    ready: false,
    bookmarks: [],
  }

  async componentWillMount() {
    const bookmarks = await this.getBookmarks();
    console.log(bookmarks);
    this.setState({
      ready: true,
      bookmarks,
    });
  }

  async getBookmarks() {
    return new Promise((resolve) => {
      chrome.bookmarks.getTree((bookmarks) => {
        resolve(bookmarks[0].children[0].children);
      });
    });
  }

  goToFolder = (folder) => {
    this.setState({
      bookmarks: folder,
    });
  }

  render() {
    const { ready, bookmarks } = this.state;

    if (ready) {
      return (
        <div className={styles.container}>
          {
            bookmarks.map(item => (
              <Item
                {...item}
                isFolder={!!item.children}
                key={item.id}
                goToFolder={this.goToFolder}
              />
            ))
          }
        </div>
      );
    } else {
      return null;
    }
  }
}
