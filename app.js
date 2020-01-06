const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const app = express();

const schema = require('./server/schema/schema');

mongoose
  .connect(
    'mongodb://fahad-gql:ytbzooks111@ds048279.mlab.com:48279/db_node_ts',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to DB'))
  .catch(e => console.log(e));

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use('/api', graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`server listening on http://127.0.0.1:${port}`)
);
