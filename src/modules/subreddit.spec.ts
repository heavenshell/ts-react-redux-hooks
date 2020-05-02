import MockAdapter from 'axios-mock-adapter'

import subredditReducer, {
  api,
  fetchSubreddit,
  getSubreddit,
} from './subreddit'
import { configureStore } from './'

import { createSubreddit } from '../__fixtures__/subreddit'

const mock = new MockAdapter(api)

describe('modules/subreddit', () => {
  afterEach(() => mock.reset())

  const initialState = { isLoading: false }

  it('should handle getSubreddit', () => {
    const mockData = createSubreddit()
    mock.onGet('https://www.reddit.com/r/cat.json').reply(200, mockData)

    return getSubreddit('cat').then(({ data }) =>
      expect(data).toEqual(mockData)
    )
  })

  it('should handle subreddit/started', () => {
    const reducer = subredditReducer(initialState, {
      type: 'subreddit/started',
    })
    expect(reducer).toEqual({ ...initialState, isLoading: true })
  })

  it('should handle subreddit/resolved', () => {
    const fixture = createSubreddit()
    const reducer = subredditReducer(initialState, {
      type: 'subreddit/resolved',
      payload: fixture,
    })
    expect(reducer).toEqual({
      isLoading: false,
      ...fixture.data,
    })
  })

  it('should handle subreddit/rejected', () => {
    const reducer = subredditReducer(initialState, {
      type: 'subreddit/rejected',
      payload: { text: 'error' },
    })

    expect(reducer).toEqual(initialState)
  })

  it('should handle fetchMe success', async () => {
    const mockData = createSubreddit()
    mock.onGet('https://www.reddit.com/r/cat.json').reply(200, mockData)

    const store = configureStore()
    const action = store.dispatch(fetchSubreddit('cat'))

    return action.then((data) => {
      const { subreddit } = store.getState()

      expect(data).toEqual(mockData)
      expect(subreddit).toEqual({
        isLoading: false,
        ...data.data,
      })
    })
  })

  it('should handle fetchMe failed', () => {
    mock.onGet('https://www.reddit.com/r/cat.json').reply(404)

    const store = configureStore()
    const action = store.dispatch(fetchSubreddit())

    expect(action).rejects.toThrowError()
  })
})
