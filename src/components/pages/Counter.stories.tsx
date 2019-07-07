import * as React from 'react'

import { action } from '@storybook/addon-actions'
import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import Counter from './Counter'

storiesOf('pages/Counter', module).add('default', () => (
  <Counter
    count={number('count', 0)}
    onDecrementClick={(e: React.MouseEvent<HTMLButtonElement>) => {
      action('onDecrementClick')(e.target)
    }}
    onIncrementClick={(e: React.MouseEvent<HTMLButtonElement>) => {
      action('onIncrementClick')(e.target)
    }}
  />
))
