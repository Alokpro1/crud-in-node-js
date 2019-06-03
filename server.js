const express = require('express');
const bodyParser =require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
//res.render(view,locals)
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname +'/index.html')
// })
const MongoClient = require('mongodb').MongoClient
// MongoClient.connect('mongodb://localhost:27017/app1', (err, database) => {
//      console.log("mongodb connected")
//  })
const client = new MongoClient('mongodb://localhost:27017/app1',{useNewUrlParser: true});
client.connect((err,database)=>{
    db=database.db("test")
    console.log("database : test created")
    app.listen(3000,function(){
        console.log('listening on 3000')
    });
})

app.post('/quotes',(req,res)=>{
    db.collection('quotes').insertOne({
        name: req.body.name,
        quote:req.body.quote
    });
    console.log('saved to database')
    
    
    res.redirect('/')
    })

app.get('/', (_req,res) =>{
    const cursor =db.collection('quotes').find({});
    cursor.toArray(function(err, docs) {
        if(err) console.log(err);
        console.log("Found the following records");
        console.log(docs)
        res.render('index.ejs',{quotes:docs})
    })
})









