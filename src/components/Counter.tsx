import * as React from 'react'

type ViewProps = {
  count: number
}

type ActionProps = {
  onDecrementClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  onIncrementClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type Props = ViewProps & ActionProps

const Counter: React.FC<Props> = ({
  count,
  onDecrementClick,
  onIncrementClick,
}) => (
  <div>
    <div>{count}</div>
    <button onClick={onDecrementClick}>-</button>
    <button onClick={onIncrementClick}>+</button>
  </div>
)

export default Counter
