const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 7000;

// user name: E_home_service
// password: SRoqtgvvLvBUZldx
// meddleWere
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.if2cap6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('home_service').collection("all_services");

        // find all data


        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        // find a document
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);

        })

    } finally {

    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server IS running...')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});