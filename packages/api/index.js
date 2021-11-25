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
  origin: [
    'https://bluejay-helpdesk.herokuapp.com',
    // 'http://192.168.0.115:19006',
    // 'exp://exp.host/@lorenz-arthur/bluejay-premium-app',
    // 'exp://192.168.0.115:19006',
    // 'http://localhost:19006',
  ],
  // origin: ['http://localhost:3000', 'http://localhost:19006'], // TODO: how to allow the sandbox access?
  // origin: 'http://localhost:19000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.get('/', (req, res) => {
  //test
  console.log('req in api server: ', req);
  console.log('req.cookies in api server: ', req.cookies);

  res.send();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  cors: corsOptions, //
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
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀  Server ready at port ${process.env.PORT || 4000}`);
  });
};

main();
