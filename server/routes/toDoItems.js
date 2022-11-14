const router = require('express').Router();

const toDoItemsModel = require('../models/toDoItems');

// [POST] -- add toDoItem to our database
router.post('/api/item', async (req, res)=>{ // [!] 'async' is important, if you get an error make sure you use 'async'
    try {
        const newItem = new toDoItemsModel({
            item: req.body.item
        })
        //save this item in database
        const saveItem = await newItem.save()
        res.status(200).json('Item Added Successfully.');
    }catch(err){
        res.json(err);
    }
})

// [GET] -- get toDoItems from database
router.get('/api/items', async (req, res)=> {
    try{
        const allToDoItems = await toDoItemsModel.find({});
        res.status(200).json(allToDoItems)
    }catch(err){
        res.json(err);
    }
})


// [PUT] -- Update a Item
router.put('/api/item/:id', async (req, res)=>{
    try{
        //find the item by it's id and update it
        const updateItem = await toDoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item Updated!')
    }catch(err){
        res.json(err);
    }
})

// [DELETE] -- Delete a Item
router.delete('/api/item/:id', async (req, res)=>{
    try{
        //find the item by it's id and delete it
        const deleteItem = await toDoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('[!] Item Deleted')
    }catch(err){
        res.json(err);
    }
})

//expor router
module.exports = router;