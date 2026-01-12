import React, { useState, useTransition } from 'react'

function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState(0);
  const handleClick = () => {
    startTransition(() => {
      setTab(c => c + 1)
    })
  }
  return (
    <div>UseTransitionDemo

      <button onClick={handleClick}>{tab}</button>
      {isPending ? <div>loading...</div>:<p>当前tab: {tab}</p>}
      
    </div>
  )
}

export default UseTransitionDemo