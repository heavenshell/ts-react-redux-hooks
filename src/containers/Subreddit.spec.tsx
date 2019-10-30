import * as React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'

import { api } from '../modules/subreddit'
import { useSubreddit } from './useSubreddit'

import TestProvider from '../__fixtures__/TestProvider'
import createSink from '../__fixtures__/createSink'
import renderHookWithWrapper from '../__fixtures__/renderHookWithWrapper'
import { createSubreddit } from '../__fixtures__/subreddit'

describe('<Subreddit />', () => {
  const mock = new MockAdapter(api)
  afterEach(mock.restore)
  const Comp = createSink(props => props)

  it('should be passed redux state', async () => {
    const paths = ['/subreddit']
    const mockData = createSubreddit()
    mock.onGet('https://www.reddit.com/r/cat.json').reply(200, mockData)

    const renderer = mount(<TestProvider component={Comp} paths={paths} />)
    const { history, match, location } = renderer.find(Comp).props()
    location.search = '&value=cat'

    const { result, waitForNextUpdate } = renderHookWithWrapper(
      () => useSubreddit({ history, location, match }),
      {
        component: Comp,
        paths,
        search: '&value=cat',
      }
    )
    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()

    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.posts).toStrictEqual(
      mockData.data.children.map(
        ({ data: { title, thumbnail, selftext, permalink } }) => ({
          title,
          thumbnail,
          selftext,
          permalink,
        })
      )
    )
    expect(result.current.subreddit).toBe('cat')
  })

  it('should render initialState', () => {
    const paths = ['/subreddit']
    mock.onGet('https://www.reddit.com/r/cat.json').reply(200, [])

    const renderer = mount(<TestProvider component={Comp} paths={paths} />)
    const { history, match, location } = renderer.find(Comp).props()

    const { result } = renderHookWithWrapper(
      () => useSubreddit({ history, location, match }),
      {
        component: Comp,
        paths,
      }
    )
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.posts).toStrictEqual([])
    expect(result.current.subreddit).toBe('')
  })
})
