const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const corsFonfig = {
    origin: true,
    credentials: true,
    }

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfgke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors(corsFonfig));
app.options('*', cors(corsFonfig));

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const islavoaudios = client.db("islavoaudio").collection("islavomusic");

    app.post('/islavomusics', (req, res) => {
        const musics = req.body;
        islavoaudios.insertOne(musics)
            .then(result => {
                res.send(result)
            })
    })

    app.get("/allislavomusics", (req, res) => {
        islavoaudios.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })
    const islavoaudioss = client.db("islavoaudio").collection("islavopremium");

    app.post('/islavopremiums', (req, res) => {
        const premium = req.body;
        islavoaudioss.insertOne(premium)
            .then(result => {
                res.send(result)
            })
    })

    app.get("/allislavopremiums", (req, res) => {
        islavoaudioss.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })
    const islavoaudiosss = client.db("islavoaudio").collection("islavoshow");

    app.post('/islavoshows', (req, res) => {
        const show = req.body;
        islavoaudiosss.insertOne(show)
            .then(result => {
                res.send(result)
            })
    })

    app.get("/allislavoshows", (req, res) => {
        islavoaudiosss.find({})
            .toArray((err, document) => {
                res.send(document)
            })
    })
});


// client.connect(err => {
//     const users = client.db("ISLAVO").collection("service");
//     console.log(err);
//     app.post('/users', (req, res) => {
//         const users = req.body;
//         users.insertOne(users)
//             .then(result => {
//                 res.send(result)
//             })
//     })
// });


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)