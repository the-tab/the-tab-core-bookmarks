import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import styles from './styles.less';

export default class TheTabBookmarks extends Component {
  static manifest = require('./manifest.json');
  static id = '@the-tab/the-tab-core-bookmarks';

  render() {
    return (
      <div className={styles.container}>
        <Dashboard />
      </div>
    );
  }
}
