import {useRef, useEffect} from 'react'

function RefDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
   <>
    <div>RefDemo</div>
    <input type="text" ref={inputRef} />
   </>
  )
}

export default RefDemo