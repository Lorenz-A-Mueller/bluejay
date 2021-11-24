const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');
const { typeDefs } = require('./utils/typeDefs');
const { resolvers } = require('./utils/resolvers');
const cookieParser = require('cookie-parser');

const app = express();

// app.get('/rest', (req, res) => {
//   res.json({
//     data: 'API is working...',
//   });
// });

const corsOptions = {
  // origin: '*',
  origin: 'https://bluejay-helpdesk.herokuapp.com',
  // origin: ['http://localhost:3000', 'http://localhost:19006'], // TODO: how to allow the sandbox access?
  // origin: 'http://localhost:19000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser(), (req) => {
  console.log('req.cookies in parser: ', req.cookies);
  return;
});

// app.get('/graphql', (req, res) => {
//   console.log('req.cookies in api server: ', req.cookies);

//   res.send();
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  cors: corsOptions,
  context: ({ req, res }) => ({
    req,
    res,
    cookies: req.cookies,
  }),
});

const main = async () => {
  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: '/graphql',
    // origin: 'https://bluejay-helpdesk.herokuapp.com',
    // credentials: true,
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀  Server ready at port ${process.env.PORT || 4000}`);
  });
};

main();
