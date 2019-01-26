/**
 * @flow
 * @relayHash 17398bf25ac39030ff55cd427a5754a3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Questions_viewer$ref = any;
export type routes_Exam_QueryVariables = {||};
export type routes_Exam_QueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: Questions_viewer$ref
  |}
|};
export type routes_Exam_Query = {|
  variables: routes_Exam_QueryVariables,
  response: routes_Exam_QueryResponse,
|};
*/


/*
query routes_Exam_Query {
  viewer {
    ...Questions_viewer
    id
  }
}

fragment Questions_viewer on Viewer {
  id
  user {
    id
    currentExam {
      id
      questions(first: 50) {
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
            __typename
          }
          cursor
        }
      }
    }
  }
}

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
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50,
    "type": "Int"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "text",
  "args": null,
  "storageKey": null
},
v3 = [
  v0,
  v2
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_Exam_Query",
  "id": null,
  "text": "query routes_Exam_Query {\n  viewer {\n    ...Questions_viewer\n    id\n  }\n}\n\nfragment Questions_viewer on Viewer {\n  id\n  user {\n    id\n    currentExam {\n      id\n      questions(first: 50) {\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          startCursor\n          endCursor\n        }\n        edges {\n          node {\n            id\n            ...SourceQuestion_sourceQuestion\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n  }\n}\n\nfragment SourceQuestion_sourceQuestion on SourceQuestion {\n  id\n  uuid\n  text\n  image\n  choiceList {\n    edges {\n      node {\n        id\n        text\n      }\n    }\n  }\n  answer {\n    id\n    text\n  }\n  explanationText\n  firstChoice {\n    id\n    nodeId\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_Exam_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Questions_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_Exam_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
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
                    "alias": null,
                    "name": "questions",
                    "storageKey": "questions(first:50)",
                    "args": v1,
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
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "uuid",
                                "args": null,
                                "storageKey": null
                              },
                              v2,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "image",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "choiceList",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "ChoiceConnection",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "edges",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "ChoiceEdge",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "name": "node",
                                        "storageKey": null,
                                        "args": null,
                                        "concreteType": "Choice",
                                        "plural": false,
                                        "selections": v3
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "answer",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Choice",
                                "plural": false,
                                "selections": v3
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "explanationText",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "firstChoice",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Choice",
                                "plural": false,
                                "selections": [
                                  v0,
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "nodeId",
                                    "args": null,
                                    "storageKey": null
                                  }
                                ]
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
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "questions",
                    "args": v1,
                    "handle": "connection",
                    "key": "Questions_questions",
                    "filters": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '05024a524f5a4cdf86356e21398e91d2';
module.exports = node;
