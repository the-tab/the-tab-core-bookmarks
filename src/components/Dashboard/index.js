import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Item from './Item';
import styles from './styles.less';
import store from './store';

@observer
export default class Dashobard extends Component {
  componentWillMount() {
    store.getBookmarks();
  }

  render() {
    const { bookmarks } = store;

    if (bookmarks) {
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
