import * as React from 'react'

import { RouteComponentProps } from 'react-router-dom'

import HomeComponent from '../components/Home'

type Props = RouteComponentProps

const handlers = ({ history }: RouteComponentProps) => {
  const onCounterLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault()
    return history.push('/counter')
  }

  const onSubredditLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault()
    return history.push('/subreddit')
  }

  return { onCounterLinkClick, onSubredditLinkClick }
}

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
