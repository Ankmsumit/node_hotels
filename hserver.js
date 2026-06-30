const express = require('express');

const app = express()
const db = require('./db')
const Person = require('./models/person');
const Menuitem = require('./models/menu');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to my class')
})

app.post('/menu',async(req,res)=>{
    try{
        const data = new Menuitem(req.body);
        const response = await data.save();
        console.log("item is saved")
        res.status(200).json(data);
    }
    catch(error){
      console.log("internal error");
      res.status(500).json({error: 'Internal server error'})
    }
})
app.get('/menu',async(req, res)=>{
  try{
    const data =await Menuitem.find();
    console.log("item is fetched");
    res.status(200).json(data);
  }
  catch(error){
    console.log('internal server error');
    res.status(500).json({error: 'Internal server error'})
  }
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
