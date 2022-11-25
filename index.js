
const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');





require('dotenv').config()


const port = 4000;
// middlewere
app.use(cors())
app.use(express.json())

// mongodb connection



const uri = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Password}@cluster0.0vygy0s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
function run() {

    try {
        const catagoryCollection = client.db('productSales').collection('catagory')
        const productCollection = client.db('productSales').collection('product')
        const usersCollectData = client.db('productSales').collection('userProfile')
        app.get('/catagory', async (req, res) => {

            const query = {}
            const result = await catagoryCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/products/:company', async (req, res) => {
            const company = req.params.company;
            const query = { company: company }
            const result = await productCollection.find(query).toArray()
            res.send(result)
        })
        // user informatotin read
        app.post('/usersInfo',async (req,res)=>{
            const userProfile = req.body;
            const result = await usersCollectData.insertOne(userProfile);
            res.send(result)
        })
// Add Product add database
app.post('/addProduct',async(req,res)=>{

    const addProduct = req.body;
    const result = await productCollection.insertOne(addProduct);
    res.send(result)
})




    }
    finally {


    }
}
run()



// -------------

app.get('/', (req, res) => {

    res.send('server running')
})
app.listen(port, () => {

    console.log(`server port runtun ${port}`);
})
