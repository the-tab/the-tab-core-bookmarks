import React, { Component } from 'react';
import bluebird from 'bluebird';

import Item from './Item';
import styles from './styles.less';

export default class Dashobard extends Component {
  state = {
    ready: false,
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
    rawBookmarks: JSON.parse(localStorage.getItem('raw_bookmarks')) || [],
  }


  async componentWillMount() {
    const rawBookmarks = await this.getBookmarks();
    localStorage.setItem('raw_bookmarks', JSON.stringify(rawBookmarks));

    if (JSON.stringify(this.state.rawBookmarks) !== JSON.stringify(rawBookmarks)) {
      console.log('Refreshing bookmarks metadata...');

      const bookmarks = await this.getBookmarksMetadata(rawBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      this.setState({
        ready: true,
        bookmarks,
      });
    } else {
      this.setState({ ready: true });
    }
  }


  async getBookmarks() {
    return new Promise((resolve) => {
      chrome.bookmarks.getTree((bookmarks) => {
        resolve(bookmarks[0].children[0].children);
      });
    });
  }


  getBookmarksMetadata = async (bookmarks) => {
    const map = await bluebird.Promise.map(bookmarks, async (b) => {
      if (b.children) {
        b.children = await this.getBookmarksMetadata(b.children);
      } else if (!b.meta) {
        b.meta = await fetch(`http://35.227.24.121/meta?url=${b.url}`).then(res => res.json()).catch(console.error);
      }
      return b;
    });

    return map;
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
