import React from "react"
import { graphql } from "react-relay"
import { Text} from "reactstrap"
import { makeRouteConfig, Route } from "found"

// import App from "./App"
import Login from "./Login"
import SourceQuestion from "./SourceQuestion"
import Questions from "./Questions"
import Layout from "./Layout.js"

import type { SourceQuestion_sourceQuestion } from "./__generated__/SourceQuestion_sourceQuestion.graphql"
import type { Questions_viewer } from "./__generated__/Questions_viewer.graphql"
import type { Layout_viewer } from "./__generated__/Layout_viewer.graphql"

const routes = makeRouteConfig(
  <Route
    path="/"
    Component={Layout}
    query={graphql`
      query routes_Layout_Query {
        viewer {
          ...Layout_viewer
        }
      }
    `}
  >
    <Route
      Component={function HomePage() {
        return <div><p></p><h4>~    Welcome to the college    ~</h4></div>
      }}
    />
    <Route path="login">
      <Route Component={Login} />
    </Route>
    <Route path="exam">
      <Route
        Component={Questions}
        query={graphql`
          query routes_Exam_Query {
            viewer {
              ...Questions_viewer
            }
          }
        `}
      />
    </Route>
    <Route path="question">
      <Route path=":id">
        <Route
          Component={SourceQuestion}
          query={graphql`
            query routes_SourceQuestionFromNode_Query($id: ID!) {
              sourceQuestion: node(id: $id) {
                ... on SourceQuestion {
                  ...SourceQuestion_sourceQuestion
                }
              }
            }
          `}
        />
      </Route>
    </Route>
  </Route>
)

export default routes
