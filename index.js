
const express = require('express');
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');





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
        // user seales  
        app.get('/deshbord/myorders/:email',async(req,res)=>{
            const email = req.params.email;

            const query = {email:email}
            const cursur = await productCollection.find(query);
            const result = await cursur.toArray()
            res.send(result);
            console.log(result);
        })

        app.get('/userInfoUserData',async(req,res)=>{
const role = req.query.role
            const query ={}
            const result = await usersCollectData.find(query).toArray()
            res.send(result)
        })

        // all sellar delete 
        app.delete("/userSeler/Delete/:id",async(req,res)=>{

            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await usersCollectData.deleteOne(query)
            res.send(result)
            console.log(result);
        })
        // buyer delete
        app.delete('/userBuyer/Delete/:id',async(req,res)=>{

            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await usersCollectData.deleteOne(query)
            res.send(result)
            console.log(result);
        })
        // Sellar Product Dellet 
        app.delete('/SellarProduct/Delete/:id',async(req,res)=>{

            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await productCollection.deleteOne(query)
            res.send(result)
            console.log(result);
        })
        app.get('/adminRole/:email',async(req,res)=>{

            const email = req.params.email
            const query ={email}
           
            const user = await usersCollectData.findOne(query)
            res.send({isAdminRole:user.role ==='admin'})
           
        })
        // user sellar Trur
        app.get('/sellar/:email',async(req,res)=>{

            const email = req.params.email
            const query ={email}
           
            const user = await usersCollectData.findOne(query)
            res.send({isSeller:user.role ==='sellar'})
           
        })
        app.get('//:email',async(req,res)=>{

            const email = req.params.email
            const query ={email}
           
            const user = await usersCollectData.findOne(query)
            res.send({isAdminRole:user.role ==='admin'})
           
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
