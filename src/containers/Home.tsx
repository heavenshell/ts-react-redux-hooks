import * as React from 'react'
import { useCallback } from 'react'

import { RouteComponentProps } from 'react-router-dom'

import HomeComponent from '../components/pages/Home'

type Props = RouteComponentProps

export const handlers = ({ history }: RouteComponentProps) => ({
  onCounterLinkClick: useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      return history.push('/counter')
    },
    [history]
  ),
  onSubredditLinkClick: useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      return history.push('/subreddit')
    },
    [history]
  )
})

const Home = ({ location, history, match }: Props) => {
  const { onCounterLinkClick, onSubredditLinkClick } = handlers({
    location,
    history,
    match,
  })
  return (
    <HomeComponent
      onCounterLinkClick={onCounterLinkClick}
      onSubredditLinkClick={onSubredditLinkClick}
    />
  )
}

export default Home
