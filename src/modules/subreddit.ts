import axios from 'axios'
import { ActionCreator, AnyAction, Reducer } from 'redux'
import { createAggregate } from 'redux-aggregate'
import { ThunkAction } from 'redux-thunk'

import { ReduxState } from '.'

// API
const api = axios.create({
  baseURL: 'https://www.reddit.com/r',
})

type Child = {
  kind: string
  data: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type SubRedditModel = {
  data: Child[]
}

const getSubreddit = (subreddit: string) => {
  return api.get<SubRedditModel>(`/${subreddit}.json`)
}

// Reducer
export type State = {
  isLoading: boolean
  children?: Child[]
}

export const initialState = {
  isLoading: false,
}

// Mutations
const started = (state: State): State => ({
  ...state,
  isLoading: true,
})

const resolved = (state: State, { data }: SubRedditModel): State => ({
  ...state,
  ...data,
  isLoading: false,
})

const rejected = (state: State): State => ({
  ...state,
  isLoading: false,
})

const getPosts = (children?: Child[]) => {
  return children
    ? children.map(({ data }) => ({
        title: data.title,
        thumbnail: data.thumbnail,
        selftext: data.selftext,
        permalink: data.permalink,
      }))
    : []
}

export const queries = { getPosts }

// Aggregate
export const SubReddit = createAggregate(
  { started, resolved, rejected },
  'subreddit/'
)

// Reducer
export default SubReddit.reducerFactory(initialState) as Reducer<
  State,
  AnyAction
>

// Thunk Action
export const fetchSubreddit: ActionCreator<
  ThunkAction<Promise<SubRedditModel>, ReduxState, null, AnyAction>
> = (subreddit: string) => {
  const { started, resolved, rejected } = SubReddit.creators

  return async dispatch => {
    dispatch(started())

    try {
      const { data } = await getSubreddit(subreddit)
      dispatch(resolved(data))
      return data
    } catch (errors) {
      dispatch(rejected())
      throw errors
    }
  }
}
