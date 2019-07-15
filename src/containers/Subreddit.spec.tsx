import * as React from 'react'
import { useDispatch } from 'react-redux'
// import { mount } from 'enzyme'
import { renderHook } from '@testing-library/react-hooks'

// import { ReduxState } from '../modules'
import Subreddit from './Subreddit'
import * as hooks from './useSubreddit'

// import { configureInitialState } from '../__fixtures__/state'
import TestProvider from '../__fixtures__/TestProvider'
// import { createSubreddit } from '../__fixtures__/subreddit'

describe('containers/Subreddit', () => {
  it('should be passed redux state', async () => {
    const fetchSubreddit = jest
      .fn()
      .mockName('fetchSubreddit')
      .mockResolvedValue('fetch success')

    jest
      .spyOn(hooks, 'mapDispatch')
      .mockImplementation(() => ({ fetchSubreddit }))

    // const {
    //   data: { children },
    // } = createSubreddit()

    // const subredditState = {
    //   isLoading: false,
    //   children,
    // }
    // const initialState: ReduxState = configureInitialState({ subredditState })

    // const renderer = mount(
    //   <TestProvider
    //     component={Subreddit}
    //     paths={['/subreddit']}
    //     search={'value=cat'}
    //     initialState={initialState}
    //   />
    // )
    // const { history, location, match } = renderer.find(Subreddit).props()
    const { result, waitForNextUpdate } = renderHook(() => useDispatch(), {
      wrapper: props => {
        return (
          <TestProvider
            {...props}
            component={Subreddit}
            paths={['/subreddit']}
          />
        )
      },
    })
    waitForNextUpdate()

    console.log(result.current)
    expect(fetchSubreddit).toBeCalledTimes(1)
    // console.log(renderer.props().initialState.subreddit)
  })
})
