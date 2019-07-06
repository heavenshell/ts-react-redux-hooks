import * as React from 'react'

import { Divider } from 'antd'

type ViewProps = {}

type ActionProps = {
  onCounterLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onSubredditLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

type Props = ViewProps & ActionProps

const Home: React.FC<Props> = ({
  onCounterLinkClick,
  onSubredditLinkClick,
}) => (
  <div>
    <p>
      <a onClick={onCounterLinkClick}>Counter(use connect)</a>
    </p>
    <Divider />
    <p>
      <a onClick={onSubredditLinkClick}>Subreddit(use hooks)</a>
    </p>
  </div>
)

export default Home
