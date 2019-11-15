import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  StoreEnhancer,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk'

import counter, { State as CounterState } from './counter'
import subreddit, { State as SubredditState } from './subreddit'

export type ReduxState = {
  counter: CounterState
  subreddit: SubredditState
}

export const configureStore = (initialState?: ReduxState) => {
  const rootReducer = combineReducers({
    counter,
    subreddit,
  })

  return createStore(
    rootReducer,
    initialState || {},
    composeWithDevTools(
      applyMiddleware(thunk as ThunkMiddleware<ReduxState, AnyAction, null>)
    ) as StoreEnhancer<{
      dispatch: ThunkDispatch<ReduxState, null, AnyAction>
    }>
  )
}
