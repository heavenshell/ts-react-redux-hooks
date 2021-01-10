import * as React from 'react'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Counter from './containers/Counter'
import Home from './containers/Home'
import Subreddit from './containers/Subreddit'

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route component={Home} exact={true} path={'/'} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Route component={Counter as any} exact={true} path={'/counter'} />
      <Route component={Subreddit} exact={true} path={'/subreddit'} />
    </Switch>
  </HashRouter>
)

export default Routes
