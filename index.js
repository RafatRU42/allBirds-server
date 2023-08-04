const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
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
