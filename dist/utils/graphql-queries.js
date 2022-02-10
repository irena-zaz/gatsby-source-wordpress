"use strict";

exports.__esModule = true;
exports.introspectionQuery = exports.contentPollingQuery = exports.actionMonitorQuery = void 0;

/**
 * Used to check if there have been any updates at all. A single action is enough to trigger refreshing in gatsby develop
 */
const contentPollingQuery =
/* GraphQL */
`
  query GET_SINGLE_ACTION_MONITOR_ACTION($since: Float!) {
    actionMonitorActions(where: { sinceTimestamp: $since }, first: 1) {
      nodes {
        id
      }
    }
  }
`;
/**
 * Used to fetch WP changes since a unix timestamp
 * so we can do incremental data fetches
 */

exports.contentPollingQuery = contentPollingQuery;
const actionMonitorQuery =
/* GraphQL */
`
  query GET_ACTION_MONITOR_ACTIONS($since: Float!, $after: String) {
    actionMonitorActions(
      where: {
        sinceTimestamp: $since
        orderby: { field: MODIFIED, order: DESC }
      }
      first: 100
      after: $after
    ) {
      nodes {
        id
        title
        actionType
        referencedNodeID
        referencedNodeStatus
        referencedNodeGlobalRelayID
        referencedNodeSingularName
        referencedNodePluralName
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
exports.actionMonitorQuery = actionMonitorQuery;
const introspectionQuery =
/* GraphQL */
`
  {
    __schema {
      types {
        kind
        name
        description

        possibleTypes {
          kind
          name
        }
        interfaces {
          kind
          name
        }
        enumValues {
          name
        }
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
        fields {
          name
          description
          args {
            name
            type {
              kind
              name
              inputFields {
                name
              }
            }
          }
          type {
            name
            kind
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }

      mutationType {
        fields {
          type {
            name
          }
        }
      }
    }
  }
`;
exports.introspectionQuery = introspectionQuery;
//# sourceMappingURL=graphql-queries.js.map