import React, { Component } from 'react'

export default class EventDemo extends Component {

  handleClick = () => {
    console.log("点击了");
  }
  render() {
    return (
      <div onClick={this.handleClick}>EventDemo按钮</div>
    )
  }
}
