const express = require('express')

const app = express()

const cors = require('cors');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = `mongodb+srv://${process.env.USER_BD}:${process.env.PASS_BD}@cluster0.5r5py.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {

    await client.connect();
    const serviceCollection = client.db('luxuryLiving').collection('service');

    app.get('/service', async (req, res) => {
      const query = {};
      const curser = serviceCollection.find(query);
      const result = await curser.toArray()
      res.send(result);
    });

    app.post('/service', async (req, res) => {
      const newPost = req.body;
      const result = await serviceCollection.insertOne(newPost);
      res.send(result);
    })

  }
  finally {

  }

}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello form Living!')
})
app.listen(port, () => {
  console.log(`Luxury Living listening on port ${port}`)
})


