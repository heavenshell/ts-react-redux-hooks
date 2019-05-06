import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './index.less'

import { configureStore } from './modules'
import Routes from './routes'

const App = () => (
  <Provider store={configureStore()}>
    <Routes />
  </Provider>
)

render(<App />, document.getElementById('app'))
