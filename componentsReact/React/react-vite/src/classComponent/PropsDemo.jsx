import { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default class PropsDemo extends Component {
  render() {
    return (
      <>
        <Welcome name="React" />
        <Welcome name="Vue" />
      </>
    );
  }
}