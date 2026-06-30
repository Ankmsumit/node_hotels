const express = require('express');
const router = express.Router();
const Menuitem = require('../models/menu');
//menuitems

router.post('/',async(req,res)=>{
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
router.get('/',async(req, res)=>{
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

router.get('/:taste', async(req, res)=>{
  try{
    const tastetype = req.params.taste;
    if(tastetype=='sweet'|| tastetype =='sour'|| tastetype=='spicy'){
      const data = await Menuitem.find({taste:tastetype});
      console.log("item is fetched");
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error: 'Invalid taste type'})
    }
  }
  catch(error){
    console.log('internal server error');
    res.status(500).json({error: 'Internal server error'})
  }
})
router.put('/:id', async(req, res)=>{
  try{
    const menuId = req.params.id;
    const updatedmenuData = req.body;
    const item = await Menuitem.findByIdAndUpdate(menuId,updatedmenuData);
    console.log("sucessfully updated:",item)
    if(!item){
      res.status(404).json( {error: "item not found"})
    }
  }catch(error){
     console.log('internal server error');
    res.status(500).json({error: 'Internal server error'})
  }
})

router.delete('/:id',  async(req, res)=>{
  try{
    const menuId = req.params.id;
    const item = await Menuitem.findByIdAndDelete(menuId);
    console.log("idem successfully deleted:", item );
    if(!item){
      res.status(404).json( {error: "item not found"})
    }

  }
  catch(error){
      console.log('internal server error');
    res.status(500).json({error: 'Internal server error'})
  }
})
module.exports = router;