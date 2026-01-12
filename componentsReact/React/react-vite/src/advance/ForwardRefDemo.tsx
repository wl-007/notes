import React, { forwardRef, useRef, useImperativeHandle  } from "react";

const TestCommponent19 = ({ref}) => {
  // useImperativeHandle(ref, () => ({
  //   log: () => {
  //     console.log('首位')
  //   },
  // }));
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
};

function ForwardRefDemo() {
  const testRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    console.log(testRef.current);
    // testRef.current.log()
    testRef.current?.focus()
  };
  return (
    <>
      <div onClick={handleClick}>ForwardRefDemo</div>
      <TestCommponent19 ref={testRef}  />
    </>
  );
}

export default ForwardRefDemo;
