import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Row,
  Col
} from "reactstrap"
import React, { Component } from "react"
import {
  createFragmentContainer,
  graphql,
  commitLocalUpdate,
  commitMutation
} from "react-relay"
import environment from "./Environment"

class SourceQuestion extends Component {
  componentDidMount() {
    var startTime = Date.now()
    commitLocalUpdate(environment, store => {
      store.get(this.props.sourceQuestion.id).setValue(startTime, "startTime")
    })
    //    this.timeOut = setTimeout(() => this.submitTimeOut(), 10000)
  }

  componentWillUnmount() {
    // clearTimeout(this.timeOut)
  }

  renderOptions() {
    const q = this.props.sourceQuestion
    const options = q.choiceList.edges.map(n => n.node)
    const answer = q.answer

    return (
        <Form>
        {options.map(o => (
          <FormGroup check key={o.id}>
            <div
              className={
                q.firstChoice && answer && answer.id === o.id
                  ? "text-success"
                  : "text-dark"
              }
            >
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  disabled={q.firstChoice}
                  checked={q.firstChoice && q.firstChoice.id === o.id}
                  onClick={() =>
                    commitLocalUpdate(environment, store => {
                      store.get(q.id).setValue(o.id, "chosenOption")
                    })
                  }
                />{" "}
                {o.text}
              </Label>
            </div>
          </FormGroup>
        ))}
      </Form>
    )
  }

  renderButtons() {
    const q = this.props.sourceQuestion

    return (
      <div className="btn-group" role="group">
      {[
        ["Guess", "danger"],
        ["Maybe", "warning"],
        ["Probable", "primary"],
        ["Certain", "success"]
      ].map(confidence => (
        <Button key={confidence}
          color={confidence[1]}
          className="pull-left"
          disabled={!q.chosenOption || q.firstChoice}
          onClick={() =>
            this.processResponse(confidence[0].toUpperCase())
          }
        >
          {confidence[0]}
        </Button>
      ))}
    </div>
    )
  }

  renderAlert(isCorrectAnswer) {
    const q = this.props.sourceQuestion
    const firstChoice = q.firstChoice
    if(!firstChoice) return null
    else if(isCorrectAnswer) return (
      <Alert color="success">
        <h6 className="alert-heading">Correct answer</h6>
      </Alert>
    )
    else return (
      <Alert color="danger">
        <h6 className="alert-heading">Incorrect answer</h6>
      </Alert>
    )
  }

  render() {
    const q = this.props.sourceQuestion
    const options = q.choiceList.edges.map(n => n.node)
    const answer = q.answer
    const user = this.props.user
    const answerIsCorrect = (q.answer && q.firstChoice && (q.answer.id === q.firstChoice.id))
    return (
      <Row>
        <Col>
          {/* hack: to make it look like the window is filled, when it isn't */}
          <Card>
            <CardBody>
              <CardText>{q.text}</CardText>
              {q.image ? <CardImg src={q.image} /> : null} <p />
              {this.renderOptions()} <p />
              {this.renderButtons()} <p />
              {this.renderAlert(answerIsCorrect)} <p />
              {q.firstChoice ? (
                <div>
                  {q.explanation ? <CardText>{q.explanation}</CardText> : null}
                </div>
              ) : null}
            </CardBody>
            <CardText key={"nodeId-"+q.id} className="text-muted text-right"><small>{q.uuid}</small></CardText>
          </Card>
        </Col>
      </Row>
    )
  }

  processResponse(confidence) {
    //    clearTimeout(this.timeOut) // todo: what if the timeout caused this?
    const endTime = Date.now()
    const timeTaken = endTime - this.props.sourceQuestion.startTime

    const variables = {
      userId: this.props.user.id,
      questionId: this.props.sourceQuestion.id,
      choiceId: this.props.sourceQuestion.chosenOption,
      confidence: confidence,
      timeTaken: timeTaken
    }

    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors)
          console.log(
            "There was an error committing the response: " + errors[0].message
          )
        else {
          console.log(response)
        }
      },
      onError: err => {
        console.log(err)
      }
    })
  }

  nextQuestion() {
    window.location.reload()
  }
}

// user is implicit in the context through the authorisation header
const mutation = graphql`
  mutation SourceQuestionResponseMutation(
    $questionId: ID!
    $choiceId: ID!
    $confidence: String!
    $timeTaken: Long!
  ) {
    respondToQuestion(
      questionId: $questionId
      choiceId: $choiceId
      confidence: $confidence
      timeTaken: $timeTaken
    ) {
      id
      firstChoice {
        id
        nodeId
      }
    }
  }
`

export default createFragmentContainer(SourceQuestion, {
  sourceQuestion: graphql`
    fragment SourceQuestion_sourceQuestion on SourceQuestion {
      id
      uuid
      text
      image
      choiceList {
        edges {
          node {
            id
            text
          }
        }
      }
      answer {
        id
        text
      }
      explanationText
      firstChoice {
        id
        nodeId
      }
      chosenOption
      startTime
    }
  `
})
