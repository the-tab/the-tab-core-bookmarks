import React, { Component } from 'react';

export default class TheTabBookmarks extends Component {
  static manifest = require('./manifest.json');
  static id = '@the-tab/the-tab-core-bookmarks';

  render() {
    return (
      <div>BOOKMARKS FOR THE TAB</div>
    );
  }
}
