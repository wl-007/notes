import {useReducer} from 'react'

function reducer(state, action) { 
  switch (action.type) { 
    case 'add':
      return {count: state.count + 1}
    case 'minus':
      return {count: state.count - 1}
    default:
      return state
  }
}
export const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, {count: 0})
  return (
    <>
      <div>useReducerDemo</div>
      <div>{state.count}</div>
      <button onClick={() => dispatch({type: 'add'})}>+</button>
      <button onClick={() => dispatch({type: 'minus'})}>-</button>
    </>
  )
}
