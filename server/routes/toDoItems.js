const router = require('express').Router();
const users = require('../models/user');
const toDoItemsModel = require('../models/toDoItems');

// [POST] -- add toDoItem to our database
router.post('/', async (req, res)=>{ // [!] 'async' is important, if you get an error make sure you use 'async'
    try {
        const newItem = new toDoItemsModel({
            item: req.body.item,
            userId: req.body.userId
        })

        //save this item in the database
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    }catch (err){
        res.status(500).json(err);
    }
})

// [GET] -- get toDoItems from the database
router.get('/:id', async (req, res)=> {
    try{
        const userId = req.params.id;

        const userToDoItems = await toDoItemsModel.find({ userId: userId });
        res.status(200).json(userToDoItems)
    }catch(err){
        res.json(err);
    }
})


// [PUT] -- Update an Item
router.put('/:id', async (req, res)=>{
    try{
        //find the item by its id and update it
        const updateItem = await toDoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item Updated!')
    }catch(err){
        res.json(err);
    }
})

// [DELETE] -- Delete an Item
router.delete('/:id', async (req, res)=>{
    try{
        //find the item by its id and delete it
        const deleteItem = await toDoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('[!] Item Deleted')
    }catch(err){
        res.json(err);
    }
})

//expor router
module.exports = router;
