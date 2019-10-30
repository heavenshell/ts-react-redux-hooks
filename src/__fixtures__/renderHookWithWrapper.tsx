import * as React from 'react'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'

import TestProvider, { Props } from './TestProvider'

const renderHookWithWrapper = <P, R>(
  callback: (props: P) => R,
  { initialState, paths, initialPath, params, search }: Props,
  renderHookOptions?: Omit<RenderHookOptions<P>, 'wrapper'>
) =>
  renderHook(callback, {
    wrapper: ({ children }) => (
      <TestProvider
        initialState={initialState}
        initialPath={initialPath}
        paths={paths}
        params={params}
        search={search}
        render={() => children}
      />
    ),
    ...renderHookOptions,
  })

export default renderHookWithWrapper
