import React from 'react'
import { useAppDispatch, useAppSelector } from '@/stores'
import { decrement, increment } from '@/stores/modules/app'
export default function ReduxDemo() {
	 const count = useAppSelector(state => state.app.value)
  const dispatch = useAppDispatch()
	return (
		<div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
	)
}
