//  add in app.js
const graphqlHttp = require("express-graphql").graphqlHTTP;
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
  })
);

//  Create a graphql folder & add 2 file 1> schema.js & 2> resolvers.js
// add in schema.js
const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type TextData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TextData!
    }
    schema {
        query: RootQuery
    }
`);

// add in resolver.js
module.exports = {
  hello() {
    return { text: "Hello World!!", views: 123 };
  },
};

// output:
// pass in body
// {
//   "query" : "{ hello { text views } }"
// }
// result :
// {
//   "data": {
//     "hello": {
//       "text": "Hello World!!",
//         "views": 123
//     }
//   }
// }
