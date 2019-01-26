/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type SourceQuestion_sourceQuestion$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Questions_viewer$ref: FragmentReference;
export type Questions_viewer = {|
  +id: string,
  +user: ?{|
    +id: string,
    +currentExam: ?{|
      +id: string,
      +questions: ?{|
        +pageInfo: {|
          +hasPreviousPage: boolean,
          +hasNextPage: boolean,
          +startCursor: ?string,
          +endCursor: ?string,
        |},
        +edges: ?$ReadOnlyArray<?{|
          +node: {|
            +id: string,
            +$fragmentRefs: SourceQuestion_sourceQuestion$ref,
          |}
        |}>,
      |},
    |},
  |},
  +$refType: Questions_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Questions_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "user",
          "currentExam",
          "questions"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 50
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    v0,
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "user",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "currentExam",
          "storageKey": null,
          "args": null,
          "concreteType": "Exam",
          "plural": false,
          "selections": [
            v0,
            {
              "kind": "LinkedField",
              "alias": "questions",
              "name": "__Questions_questions_connection",
              "storageKey": null,
              "args": null,
              "concreteType": "SourceQuestionConnection",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "pageInfo",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageInfo",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "hasPreviousPage",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "hasNextPage",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "startCursor",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "endCursor",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "edges",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "SourceQuestionEdge",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "node",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "SourceQuestion",
                      "plural": false,
                      "selections": [
                        v0,
                        {
                          "kind": "FragmentSpread",
                          "name": "SourceQuestion_sourceQuestion",
                          "args": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "__typename",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "cursor",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb876709e4f9f9df3f09c6cacd947be5';
module.exports = node;
