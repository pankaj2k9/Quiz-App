// @flow
import React from "react"
import { Redirect } from "found"
import {
  createPaginationContainer,
  graphql,
  commitLocalUpdate
} from "react-relay"
import { Button } from "reactstrap"

import SourceQuestion from "./SourceQuestion"

import environment from "./Environment"
import type { Questions_viewer } from "./__generated__/Questions_viewer.graphql"
import type { SourceQuestion_sourceQuestion } from "./__generated__/SourceQuestion_sourceQuestion.graphql"
import type { RelayPaginationProp } from "react-relay"

type QuestionPaginationComponentProps = {
  relay: RelayPaginationProp,
  viewer: Questions_user
}

class Questions extends React.Component<QuestionPaginationComponentProps> {
  render() {
    const { user } = this.props.viewer
    // Needed to handle casses when user has logged out
    if (!user) return null
    const exam = user.currentExam
    const questions = exam.questions
  ///  const lastQuestion = questions.edges[questions.edges.length - 1].node
    const currentQuestion = questions.edges

    return (
      <div>
        <SourceQuestion sourceQuestion={currentQuestion} user={user} key={currentQuestion.id} />
        <Button className="float-right" onClick={() => this._loadMore()}>
          Next question
        </Button>
      </div>
    )
  }

  _loadMore() {
    if (this.props.relay.isLoading()) {
      return
    }
    // todo: if we have reached the end of the questions, it should be handled
    else if (!this.props.relay.hasMore()) {
      return
    }
    this.props.relay.loadMore(
      1, // Fetch the next feed items
      error => {
        error ? console.log(error) : () => {}
      }
    )
  }
}

// todo: make pagination load more on pressing 'load more' button, remove 50 default load
export default createPaginationContainer(
  Questions,
  {
    viewer: graphql`
      fragment Questions_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 50 }
          cursor: { type: "String" }
        ) {
        id
        user {
          id
          currentExam {
            id
            questions(first: $count, after: $cursor)
              # orderby: $orderBy # other variables
              @connection(key: "Questions_questions") {
              pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
              edges {
                node {
                  id
                  ...SourceQuestion_sourceQuestion
                }
              }
            }
          }
        }
      }
    `
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return (
        props.viewer &&
        props.viewer.user &&
        props.viewer.user.currentExam &&
        props.viewer.user.currentExam.questions
      )
    },
    getFragmentVariables(previousVariables, totalCount) {
      return {
        ...previousVariables,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor
      }
    },
    query: graphql`
      query QuestionsPaginationQuery(
        $count: Int!
        $cursor: String # $nodeId: String! # $orderby: String!
      ) {
        viewer {
          ...Questions_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
)
