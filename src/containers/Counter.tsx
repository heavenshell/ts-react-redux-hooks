import * as React from 'react'

import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import CounterComponent from '../components/Counter'
import { ReduxState } from '../modules'

import { increment, decrement } from '../modules/counter'

type MapProps = {
  count: number
}

const mapProps = ({ counter }: ReduxState): MapProps => ({
  count: counter.count,
})

type MapDispatch = {
  increment: () => any
  decrement: () => any
}

const mapDispatch = (
  dispatch: ThunkDispatch<ReduxState, null, AnyAction>
): MapDispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
})

const connector = connect(
  mapProps,
  mapDispatch
)

const Counter = connector(({ count, increment, decrement }) => {
  return (
    <CounterComponent
      count={count}
      onDecrementClick={decrement}
      onIncrementClick={increment}
    />
  )
})

export default Counter
