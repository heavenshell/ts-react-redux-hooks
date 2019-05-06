import { useEffect } from 'react'

import { parse } from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { Props as ViewProps } from '../components/Subreddit'
import { ReduxState } from '../modules'
import { fetchSubreddit, queries, SubRedditModel } from '../modules/subreddit'

export type MapProps = {
  isLoading: boolean
  posts?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  subreddit: string
}

export const mapProps = ({ location }: RouteComponentProps) => ({
  subreddit,
}: ReduxState): MapProps => {
  const { value } = parse(location.search)
  const posts = queries.getPosts(subreddit.children)
  return { isLoading: subreddit.isLoading, posts, subreddit: value }
}

export type MapDispatch = {
  fetchSubreddit: (subreddit: string) => Promise<SubRedditModel>
}

export const mapDispatch = (
  dispatch: ThunkDispatch<ReduxState, null, AnyAction>
): MapDispatch => ({
  fetchSubreddit: subbreddit => dispatch(fetchSubreddit(subbreddit)),
})

const subredditHandlers = ({ history, location }: RouteComponentProps) => {
  const onSubmit: ViewProps['onSubmit'] = data => {
    const { value } = parse(location.search)
    if (value === data.subreddit) {
      return
    }

    const nextPath = `/subreddit?value=${data.subreddit}`
    return history.push(nextPath)
  }

  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    permalink: string
  ) => {
    event.preventDefault()
    return window.open(`https://www.reddit.com/${permalink}`)
  }

  return { onLinkClick, onSubmit }
}

type UseSubredditEffectProps = {
  fetchSubreddit: MapDispatch['fetchSubreddit']
}

const useSubredditEffect = ({
  location: { search },
  fetchSubreddit,
}: RouteComponentProps & UseSubredditEffectProps) => {
  const { value } = parse(search)
  useEffect(() => {
    if (value) {
      fetchSubreddit(value)
    }
  }, [value])
}

export const useSubreddit = ({
  location,
  history,
  match,
}: RouteComponentProps) => {
  const dispatch = useDispatch()
  const { isLoading, posts, subreddit } = useSelector(
    mapProps({ location, history, match })
  )

  const { onLinkClick, onSubmit } = subredditHandlers({
    history,
    location,
    match,
  })
  const { fetchSubreddit } = mapDispatch(dispatch)

  useSubredditEffect({
    history,
    location,
    match,
    fetchSubreddit,
  })

  return { onLinkClick, onSubmit, isLoading, posts, subreddit }
}
