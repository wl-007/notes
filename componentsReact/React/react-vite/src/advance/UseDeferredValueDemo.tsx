import React, { useDeferredValue, useState } from 'react'

function UseDeferredValueDemo() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <div>
      UseDeferredValueDemo
        <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      当前值: {query}
      延迟值: {deferredQuery}
    </div>
  )
}

export default UseDeferredValueDemo