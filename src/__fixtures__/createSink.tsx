/* eslint-disable @typescript-eslint/no-explicit-any */
// Copy from recompose/createSink
import * as React from 'react'
import { polyfill } from 'react-lifecycles-compat'

const createSink = (
  callback: (props: Record<string, any>) => void
): React.ComponentClass<any> => {
  class Sink extends React.Component {
    public state = {}
    public static getDerivedStateFromProps(nextProps: any) {
      callback(nextProps)
      return null
    }

    public render() {
      return null
    }
  }
  polyfill(Sink)
  return Sink
}

export default createSink
/* eslint-enable @typescript-eslint/no-explicit-any */
