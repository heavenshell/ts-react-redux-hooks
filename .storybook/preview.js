import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { configureViewport } from '@storybook/addon-viewport'
import { addParameters } from '@storybook/react'
import { withScreenshot } from 'storycap'

import '../src/index.less'

addDecorator(withKnobs)

addParameters({
  viewports: {
    responsive: {
      name: 'Responsive',
      styles: { width: '100%', height: '100%' },
    },
    xxl: {
      name: 'xxl',
      styles: { width: '1600px', height: '100%' },
    },
    xl: {
      name: 'xl',
      styles: { width: '1200px', height: '100%' },
    },
    lg: {
      name: 'lg',
      styles: { width: '992px', height: '100%' },
    },
    md: {
      name: 'md',
      styles: { width: '768px', height: '100%' },
    },
    sm: {
      name: 'sm',
      styles: { width: '576px', height: '100%' },
    },
    xs: {
      name: 'xs',
      styles: { width: '568px', height: '100%' },
    },
  },
})

// Storycap
export const decorators = [
  withScreenshot,
]
