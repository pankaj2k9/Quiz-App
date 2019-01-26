// @flow
import React from "react"
import Questions from "./Questions"
import SourceQuestion from "./SourceQuestion"

import type { Questions_user } from "./__generated__/Questions_viewer.graphql"
import type { SourceQuestion_sourceQuestion } from "./__generated__/SourceQuestion_sourceQuestion.graphql"

type Props = {
  // viewer: App_viewer
}

class App extends React.Component<Props> {
  render() {
    return <div>App route is working maybe</div>
  }
}

export default App
