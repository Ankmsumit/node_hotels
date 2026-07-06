const express = require('express');

const app = express()
const db = require('./db')
const Person = require('./models/person');
const Menuitem = require('./models/menu');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('welcome to my class')
})

app.post('/person', async (req, res) => {//async is used to define an asynchronous function that can use the await keyword inside it. This allows for handling asynchronous operations, such as saving data to a database, in a more readable and manageable way.
  try {
    const person = new Person(req.body);
    const response =await person.save();//await is used to wait for the save operation to complete before proceeding. This ensures that the person is saved to the database before sending a response back to the client.
    console.log("Person saved successfully:", response);
    res.status(200).json(person);
  } catch (error) {
    console.error("Error saving person:", error); 
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/person',  async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Persons fetched successfully:");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error details:");
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/person/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;

    if (
      worktype === 'chef' ||
      worktype === 'waiter' ||
      worktype === 'owner'
    ) {
      const data = await Person.find({ work: worktype });

      console.log("Persons fetched successfully for work type:", worktype);
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.log("Error details:", error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

//menuitems

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
const personroute = require('./router/personRoute');
app.use('/person', personroute);

const menuitemroute = require('./router/menuitemRoutes');
app.use('/menu', menuitemroute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
