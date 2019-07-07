import { ReduxState } from '../modules'

import { State as CounterState } from '../modules/counter'
import { State as SubredditState } from '../modules/subreddit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultState = (param: any) => (param ? param : { isLoading: false })

export const configureInitialState = (params: {
  counterState?: CounterState,
  subredditState?: SubredditState,
}): ReduxState => ({
  counter: params.counterState ? params.counterState : { count: 0 },
  subreddit: defaultState(params.subredditState),
})
