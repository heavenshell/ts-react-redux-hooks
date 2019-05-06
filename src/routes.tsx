import * as React from 'react'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Counter from './containers/Counter'
import Subreddit from './containers/Subreddit'

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route component={Counter} exact={true} path={'/counter'} />
      <Route component={Subreddit} exact={true} path={'/subreddit'} />
    </Switch>
  </HashRouter>
)

export default Routes
