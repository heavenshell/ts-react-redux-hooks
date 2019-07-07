// Copy from recompose/createSink
import * as React from 'react'
import { polyfill } from 'react-lifecycles-compat'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSink = (callback: (props: Object) => void): React.ComponentClass<any> => {
  class Sink extends React.Component {
    state = {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDerivedStateFromProps(nextProps: any) {
      callback(nextProps)
      return null
    }

    render() {
      return null
    }
  }
  polyfill(Sink)
  return Sink
}

export default createSink
