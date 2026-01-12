import React from "react";

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
export default function PropsDemo() {
  return (
    <>
      <div>PropsDemo</div>
      <Welcome name="React"></Welcome>
      <Welcome name="Vue"></Welcome>
    </>
  );
}
