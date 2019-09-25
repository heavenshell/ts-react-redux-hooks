import * as React from 'react'
import * as yup from 'yup'
import { FormikActions } from 'formik'

import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { image, internet, lorem } from 'faker'

import Subreddit from './Subreddit'

type Values = {
  [key: string]: unknown
}

const handleSubmit = (eventName = 'onSubmit', timeout = 2000) => (
  data: Values,
  { setSubmitting }: FormikActions<Values>
) => {
  setTimeout(() => {
    setSubmitting(false)
    action(eventName)(data)
  }, timeout)
}

const validationSchema = yup.object().shape({
  subreddit: yup.string().required(),
})

const mockData = Array.from(new Array(10), () => ({
  title: lorem.words(),
  thumbnail: image.imageUrl(),
  selftext: lorem.sentences(),
  permalink: internet.url(),
}))

storiesOf('pages/Subreddit', module)
  .add('default', () => (
    <Subreddit
      initialValues={{ subreddit: text('subreddit', 'text') }}
      isLoading={false}
      onSubmit={handleSubmit()}
      validationSchema={validationSchema}
      posts={mockData}
      onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        action('onLinkClick')(e.target)
      }}
    />
  ))
  .add('isLoading', () => (
    <Subreddit
      initialValues={{ subreddit: '' }}
      isLoading={true}
      onSubmit={handleSubmit()}
      validationSchema={validationSchema}
      posts={[]}
      onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        action('onLinkClick')(e.target)
      }}
    />
  ))
  .add('no data', () => (
    <Subreddit
      initialValues={{ subreddit: '' }}
      isLoading={false}
      onSubmit={handleSubmit()}
      validationSchema={validationSchema}
      posts={[]}
      onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        action('onLinkClick')(e.target)
      }}
    />
  ))
