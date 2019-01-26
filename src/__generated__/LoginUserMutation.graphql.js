/**
 * @flow
 * @relayHash 2d4a6c37a894909daf1ef20e0b18e046
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LoginUserMutationVariables = {|
  email: string,
  password: string,
|};
export type LoginUserMutationResponse = {|
  +login: ?{|
    +id: string,
    +user: ?{|
      +id: string,
      +token: string,
      +firstName: string,
    |},
  |}
|};
export type LoginUserMutation = {|
  variables: LoginUserMutationVariables,
  response: LoginUserMutationResponse,
|};
*/


/*
mutation LoginUserMutation(
  $email: String!
  $password: String!
) {
  login(email: $email, password: $password) {
    id
    user {
      id
      token
      firstName
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "email",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "login",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email",
        "type": "String!"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password",
        "type": "String!"
      }
    ],
    "concreteType": "Viewer",
    "plural": false,
    "selections": [
      v1,
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "token",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "firstName",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "LoginUserMutation",
  "id": null,
  "text": "mutation LoginUserMutation(\n  $email: String!\n  $password: String!\n) {\n  login(email: $email, password: $password) {\n    id\n    user {\n      id\n      token\n      firstName\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LoginUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "LoginUserMutation",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a1a62b373fa1516db815308e893d7d46';
module.exports = node;
