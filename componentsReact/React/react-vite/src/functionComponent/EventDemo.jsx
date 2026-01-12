import React from "react";

export default function EventDemo() {
  const handleClick = () => {
    console.log("点击了按钮");
  };
  return (
    <>
      <div>EventDemo</div>
      <button onClick={handleClick}>点击</button>
    </>
  );
}
