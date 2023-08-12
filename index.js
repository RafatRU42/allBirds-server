const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lfwjozb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  


//middleware

app.use(cors())
app.use(express.json())



async function run() {


    try{

    const allProducts = client.db('allBirds').collection('allProducts')
    const cartProducts = client.db('allBirds').collection('cart')
    const userCollection= client.db('allBirds').collection('user')
    const amazonProduct = client.db('allBirds').collection('amazonProduct')

    app.get('/allProducts',async (req,res) =>{
      const query = {}
      const data = await allProducts.find(query).toArray()
      res.send(data)
    })

    
    app.get('/men',async(req,res) =>{
      const query = {category:"men's clothing"}
      const result = await allProducts.find(query).toArray()
      res.send(result)
    })

    app.get('/women',async(req,res) =>{
       const query = {category:"women's clothing"}
       const result = await allProducts.find(query).toArray()
       res.send(result)
    })

    app.get('/jewellery',async(req,res) =>{
      const query = {category:'jewelery'}
      const result = await allProducts.find(query).toArray()
      res.send(result)
    })
    
    
    app.get('/electronics',async(req,res) =>{
      const query = {category:'electronics'}
      const result = await allProducts.find(query).toArray()
      res.send(result)
    })

    app.get('/details/:id',async(req,res) =>{
      const id = req.params.id;
      const filter= {_id:new ObjectId(id)}
      const data = await allProducts.findOne(filter)
      res.send(data)
    })

    app.post('/addToCart',async(req,res) =>{
      const data = req.body;
      const result = await cartProducts.insertOne(data)
      res.send(result)
    })

    app.get('/getCartProduct',async(req,res) =>{
      const email = req.query.email;
      const query = {email:email}
      const result = await cartProducts.find(query).toArray()
      res.send(result)
    })

    app.post('/user',async(req,res) =>{
      const data = req.body;
      const result = await userCollection.insertOne(data)
      res.send(result)
    })

    app.delete('/deleteProduct',async(req,res) =>{
      const email = req.query?.email;
      const id = req.query?.id
      console.log('email',email);
      const emailQuery = {email:email}
      const emailData = await cartProducts.findOne(emailQuery)
      const idQuery = {_id: new ObjectId(id)}
      const deleteOne = await emailData.deleteOne(idQuery)
      res.send(deleteOne)
    })

    app.get('/amazonProduct',async(req,res) =>{
      const query = {}
      const result = await amazonProduct.find(query).toArray()
      res.send(result)
    })

    app.get('/amazonDetails/:id',async(req,res) =>{
      const id = req.params.id;
      const query = {_id: (new ObjectId(id))}
      const data = await amazonProduct.findOne(query)
      res.send(data)
    })


    }
    finally{

    }
}
run().catch(err => console.error(err))

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(port,() =>{
    console.log('Server is running on PORT 5000');
})
