import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Switch, RouteProps } from 'react-router-dom'
import { MemoryRouterProps } from 'react-router'

import { configureStore, ReduxState } from '../modules'

type RouterInitialProps = {
  paths: string[]
  initialPath?: string
  params?: RouteProps
  search?: string
  isRedux?: boolean
}

export type Props = MemoryRouterProps &
  RouterInitialProps & {
    component?: RouteProps['component'] | any // eslint-disable-line @typescript-eslint/no-explicit-any
    render?: RouteProps['render']
    initialState?: ReduxState
  }

const TestProvider: React.FC<Props> = ({
  component: Component,
  render,
  initialState,
  paths,
  initialPath,
  search,
  isRedux = true,
}) => {
  const initialEntries: MemoryRouterProps['initialEntries'] = paths.map(
    (path) => ({ pathname: path, search })
  )
  const initialIndex = initialPath ? paths.indexOf(initialPath) : 0

  const Router = () => (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Switch>
        {paths.map((path) => (
          <Route key={path} path={path} component={Component} render={render} />
        ))}
      </Switch>
    </MemoryRouter>
  )

  if (isRedux) {
    return (
      <Provider store={configureStore(initialState)}>
        <Router />
      </Provider>
    )
  }

  return <Router />
}

export default TestProvider
