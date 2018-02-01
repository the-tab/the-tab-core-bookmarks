import React, { Component } from 'react';

export default class LongPress extends Component {
  timeout = null;
  longPress = false;

  onMouseDown = () => {
    console.log('Mouse down');
    this.timeout = setTimeout(() => {
      this.longPress = true;
    }, 300);
  }

  onMouseUp = (e) => {
    clearTimeout(this.timeout);

    if (this.longPress) {
      e.preventDefault();
      console.log('Long press!!!');

      if (this.props.onLongPress) {
        this.props.onLongPress(e);
      }
    } else {
      if (this.props.onClick) {
        this.props.onClick(e);
      }

      if (this.props.htmlElement === 'a') {
        document.location.href = this.props.href;
      }
    }
  }

  render() {
    const {
      children, htmlElement, onClick, href, onLongPress, ...props
    } = this.props;

    const HtmlElement = `${htmlElement}`;

    return (
      <HtmlElement
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        {...props}
      >
        { children }
      </HtmlElement>
    );
  }
}
