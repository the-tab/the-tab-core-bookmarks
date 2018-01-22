import React, { Component } from 'react';

export default class TestModule extends Component {
  static manifest = require('./manifest.json');

  render() {
    return (
      <div>BOOKMARKS FOR THE TAB</div>
    );
  }
}
