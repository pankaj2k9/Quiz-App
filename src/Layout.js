// @flow
import React from "react"
import { createRefetchContainer, graphql, commitMutation } from "react-relay"
import { Button } from "reactstrap"
import { Link } from "found"

import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import environment from "./Environment"
import type { Layout_viewer } from "./__generated__/Layout_viewer.graphql"
import type { RelayPaginationProp } from "react-relay"

const mutation = graphql`
  mutation LayoutMutation {
    logout {
      id
      user {
        id
      }
    }
  }
`
function logoutUserTest(environment, cb) {
  const variables = {}
  return commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      if (errors)
        console.log("There was an error logging in: " + errors[0].message)
      else {
        console.log(response.login)
        localStorage.removeItem("AUTH_TOKEN")
        cb()
      }
    },
    onError: err => {
      console.log(err)
      cb(err)
    }
  })
}

type LayoutComponentProps = {
  relay: RelayPaginationProp,
  viewer: Layout_viewer,
  children: any,
  router: any
}
type LayoutComponentState = {}

class Layout extends React.Component<
  LayoutComponentProps,
  LayoutComponentState
> {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleLogoutMutation = () => {
    logoutUserTest(environment, err => {
      if (err) {
      } else {
        this.props.router.push("/")
      }
    })
  }
  renderLoggedIn(user) {
    return (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle color="primary" nav caret>
            {user.firstName}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.handleLogoutMutation}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  }
  renderLoggedOut() {
    return (
      <Nav className="ml-auto" navbar>
        <Link to={"/login"}>
          <Button color="primary">Login</Button>
        </Link>
      </Nav>
    )
  }
  renderHeader() {
    const { user } = this.props.viewer
    return (
      // className="navbar navbar-dark bg-primary"
      <Navbar expand="md" color="primary" className="navbar-dark bg-primary">
        <NavbarBrand href="/">
          <h4 style={{ margin: 0 }}>College of Rhubarb</h4>
        </NavbarBrand>
        {user ? this.renderLoggedIn(user) : this.renderLoggedOut()}
      </Navbar>
    )
  }
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    )
  }
}

// todo: make pagination load more on pressing 'load more' button, remove 200 default load
export default createRefetchContainer(Layout, {
  viewer: graphql`
    fragment Layout_viewer on Viewer {
      id
      user {
        id
        firstName
        lastName
      }
    }
  `
})
