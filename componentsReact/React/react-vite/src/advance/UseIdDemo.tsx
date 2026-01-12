import React, { useId } from 'react'

function UseIdDemo() {
  const id = useId()
  return (
    <>
    <div>UseIdDemo</div>
    <label htmlFor={id}>name</label>
    <input type="text" id={id} />
    </>
  )
}

export default UseIdDemo