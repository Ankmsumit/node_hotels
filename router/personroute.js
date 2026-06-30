const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/', async (req, res) => {//async is used to define an asynchronous function that can use the await keyword inside it. This allows for handling asynchronous operations, such as saving data to a database, in a more readable and manageable way.
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

router.get('/',  async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Persons fetched successfully:");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error details:");
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:worktype', async (req, res) => {
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


router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;
    const person = await Person.findByIdAndUpdate(personId, updatedData, { new: true, runValidators: true });
    console.log("Person updated successfully:", person);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; 
    const person = await Person.findByIdAndDelete(personId);
    console.log("Person deleted successfully:", person);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;