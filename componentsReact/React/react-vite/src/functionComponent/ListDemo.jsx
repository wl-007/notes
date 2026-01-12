import React from 'react'

export default function ListDemo() {
  const list = [
    { id: 1, name: "张三" },
    { id: 2, name: "张三" },
    { id: 3, name: "张三" },
    { id: 4, name: "张三" },
    { id: 5, name: "张三" },
  ];
  return (
    <>
      <div>ListDemo</div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}
