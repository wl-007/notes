import { Component } from "react";

export default class StateDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      msg: "你好",
    };
  }
  render() {
    return (
      <>
        <p>当前计数: {this.state.msg}</p>
        <p>当前计数: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          增加
        </button>
      </>
    );
  }
}
