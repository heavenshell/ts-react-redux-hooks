import * as React from 'react'
import { Button, Card } from 'antd'
import styled from '@emotion/styled'
import { NativeButtonProps } from 'antd/lib/button/button'

type ViewProps = {
  count: number
}

type ActionProps = {
  onDecrementClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  onIncrementClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type Props = ViewProps & ActionProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledButton = styled<React.FC<NativeButtonProps>>(Button as any)`
  & + & {
    margin-left: 20px;
  }
`

const Counter: React.FC<Props> = ({
  count,
  onDecrementClick,
  onIncrementClick,
}) => (
  <Card>
    <div>
      <div>{count}</div>
      <StyledButton onClick={onDecrementClick}>-</StyledButton>
      <StyledButton onClick={onIncrementClick}>+</StyledButton>
    </div>
  </Card>
)

export default Counter
