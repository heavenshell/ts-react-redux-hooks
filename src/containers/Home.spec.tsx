import * as React from 'react'

import { mount } from 'enzyme'
import { renderHook, act } from '@testing-library/react-hooks'

import createSink from '../__fixtures__/createSink'
import TestProvider from '../__fixtures__/TestProvider'

import Home, { handlers } from './Home'

describe('<Home />', () => {
  const Comp = createSink(props => props)

  it('should onCounterLinkClick', () => {
    const renderer = mount(
      <TestProvider component={Comp} paths={['/']} />
    )
    const { history, location, match } = renderer.find(Comp).props()
    const mockHistoryPush = jest.fn().mockName('history.push')
    history.push = mockHistoryPush

    const mockClickEvent = {
      preventDefault: jest.fn().mockName('preventDefault'),
    }

    const { result } = renderHook(() => handlers({ history, location, match }))
    const { onCounterLinkClick } = result.current
    act(() => {
      onCounterLinkClick(mockClickEvent as any)
    })

    expect(mockClickEvent.preventDefault).toHaveBeenCalled()
    renderer.update()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/counter')
  })

  it('should onSubredditLinkClick', () => {
    const renderer = mount(
      <TestProvider component={Comp} paths={['/']} />
    )
    const { history, location, match } = renderer.find(Comp).props()
    const mockHistoryPush = jest.fn().mockName('history.push')
    history.push = mockHistoryPush

    const mockClickEvent = {
      preventDefault: jest.fn().mockName('preventDefault'),
    }

    const { result } = renderHook(() => handlers({ history, location, match }))
    const { onSubredditLinkClick } = result.current
    act(() => {
      onSubredditLinkClick(mockClickEvent as any)
    })

    expect(mockClickEvent.preventDefault).toHaveBeenCalled()
    renderer.update()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/subreddit')
  })

  it('should onSubredditLinkClick - without createSink', () => {
    const renderer = mount(
      <TestProvider component={Home} paths={['/']} />
    )
    const { history, location, match } = renderer.find(Home).props()

    const mockHistoryPush = jest.fn().mockName('history.push')
    history.push = mockHistoryPush

    const mockClickEvent = {
      preventDefault: jest.fn().mockName('preventDefault'),
    }

    const { result } = renderHook(() =>
      renderer.invoke('component')({ history, location, match })
    )
    const { onCounterLinkClick } = result.current.props

    onCounterLinkClick(mockClickEvent)
    renderer.update()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/counter')
  })

  it('should onSubredditLinkClick - without createSink', () => {
    const renderer = mount(
      <TestProvider component={Home} paths={['/']} />
    )
    const { history, location, match } = renderer.find(Home).props()

    const mockHistoryPush = jest.fn().mockName('history.push')
    history.push = mockHistoryPush

    const mockClickEvent = {
      preventDefault: jest.fn().mockName('preventDefault'),
    }

    const { result } = renderHook(() =>
      renderer.invoke('component')({ history, location, match })
    )
    const { onCounterLinkClick } = result.current.props

    onCounterLinkClick(mockClickEvent)
    renderer.update()

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(mockHistoryPush).toHaveBeenCalledWith('/counter')
  })
})
