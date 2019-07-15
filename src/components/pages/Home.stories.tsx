import * as React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import Home from './Home'

storiesOf('pages/Home', module).add('default', () => (
  <Home
    onCounterLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      action('onCounterLinkClick')(e.target)
    }}
    onSubredditLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      action('onSubredditLinkClick')(e.target)
    }}
  />
))
