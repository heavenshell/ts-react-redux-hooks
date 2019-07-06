import * as React from 'react'

import { mount } from 'enzyme'

import TestProvider from '../__fixtures__/TestProvider'

import Counter from './Counter'

describe('<Counter />', () => {
  it('should onIncrementClick', () => {
    const renderer = mount(
      <TestProvider component={Counter} paths={['/']} />
    )
    const count = 0
    const increment = jest.fn()
    const decrement = jest.fn()
    const { onIncrementClick } = renderer.props().component.WrappedComponent(
      { count, increment, decrement }
    ).props

    onIncrementClick()
    renderer.update()
    expect(increment).toHaveBeenCalledTimes(1)

    onIncrementClick()
    renderer.update()
    expect(increment).toHaveBeenCalledTimes(2)
  })

  it('should onDecrementClick', () => {
    const renderer = mount(
      <TestProvider component={Counter} paths={['/']} />
    )
    const count = 0
    const increment = jest.fn()
    const decrement = jest.fn()
    const { onDecrementClick } = renderer.props().component.WrappedComponent(
      { count, increment, decrement }
    ).props

    onDecrementClick()
    renderer.update()
    expect(decrement).toHaveBeenCalledTimes(1)

    onDecrementClick()
    renderer.update()
    expect(decrement).toHaveBeenCalledTimes(2)
  })
})
