import * as React from 'react'

import { RouteComponentProps } from 'react-router-dom'
import * as yup from 'yup'

import SubredditComponent from '../components/Subreddit'
import { useSubreddit, MapProps, MapDispatch } from './useSubreddit'

const validationSchema = yup.object().shape({
  subreddit: yup.string().required(),
})

type Props = RouteComponentProps & MapProps & MapDispatch

const Subreddit = ({ location, history, match }: Props) => {
  const { onLinkClick, onSubmit, isLoading, posts, subreddit } = useSubreddit({
    location,
    history,
    match,
  })
  return (
    <SubredditComponent
      initialValues={{ subreddit }}
      onSubmit={onSubmit}
      onLinkClick={onLinkClick}
      validationSchema={validationSchema}
      isLoading={isLoading}
      posts={posts}
    />
  )
}

export default Subreddit
