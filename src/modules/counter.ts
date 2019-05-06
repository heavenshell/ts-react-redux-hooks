import { AnyAction, Reducer } from 'redux'
import { createAggregate } from 'redux-aggregate'

// Reducer
export type State = {
  count: number
}

export const initialState = {
  count: 0,
}

const mutations = {
  increment: (state: State) => ({ ...state, count: state.count + 1 }),
  decrement: (state: State) => ({ ...state, count: state.count - 1 }),
}

// Aggregate
export const Counter = createAggregate(mutations, 'counter/')

// Reducer
export default Counter.reducerFactory(initialState) as Reducer<State, AnyAction>

export const increment = () => {
  const { increment } = Counter.creators
  return increment()
}

export const decrement = () => {
  const { decrement } = Counter.creators
  return decrement()
}
