import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  FormText
} from "reactstrap"
import React, { Component } from "react"
import { graphql, commitMutation } from "react-relay"
import environment from "./Environment"

const mutation = graphql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      user {
        id
        token
        firstName
      }
    }
  }
`
function loginUserTest(environment, email, password, cb) {
  const variables = {
    email: email,
    password: password
  }

  return commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      if (errors)
        console.log("There was an error logging in: " + errors[0].message)
      else {
        console.log(response.login)
        localStorage.setItem("AUTH_TOKEN", response.login.user.token) //todo: import constant with AUTH_TOKEN_KEY from Environment.js
        cb()
      }
    },
    onError: err => {
      console.log(err)
      cb(err)
    }
  })
}
type LoginProps = {}
type LoginState = {
  email: any,
  password: any,
  validate: any,
  working: boolean
}
class Login extends Component<LoginProps, LoginState> {
  constructor(props) {
    super(props)
    this.state = {
      working: false,
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success"
    } else {
      validate.emailState = "has-danger"
    }
    this.setState({ validate })
  }

  handleChange = async event => {
    const { target } = event
    const value = target.type === "checkbox" ? target.checked : target.value
    const { name } = target
    await this.setState({
      [name]: value
    })
  }

  submitForm = e => {
    e.preventDefault()
    console.log(`Email: ${this.state.email}`)
    this.setState({ working: true })
    loginUserTest(environment, this.state.email, this.state.password, err => {
      this.setState({ working: false })
      if (err) {
      } else {
        this.props.router.push("/exam")
      }
    })
  }

  render() {
    return (
      <Container className="App">
        <h3>Log In</h3>
        <Form className="form" onSubmit={e => this.submitForm(e)} method="post">
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="email@whatever.com"
                value={this.state.email}
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  this.validateEmail(e)
                  this.handleChange(e)
                }}
              />
              <FormFeedback valid>
                Looks legit.
              </FormFeedback>
              <FormFeedback>Please input a correct email.</FormFeedback>
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder=""
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
          </Col>
          <Button disabled={this.state.working}>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default Login

// export default createFragmentContainer(Login, {
//   user: graphql`
//     fragment Login_user on viewer {

//   `
// })
