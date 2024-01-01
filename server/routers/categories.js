const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

// Get all categories
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
})
// Category details
router.get('/:id', async(req, res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found'})
    }
    res.status(200).send(category);
    
})
// Create a new category
router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
    })
    category = await Category.save();

    if(!category)
    return res.status(404).send('the category cannot be created')

    res.send(category);
})
// Upadate category 
router.put('/:id', async (req, res) =>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
        },
        { new: true}
    )

    if(!category)
    return res.status(404).send('the category cannot be created')

    res.send(category);
    
})
// Delete a category
router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'category is deleted'})
        } else {
            return res.status(404).json({success: false, message: 'the category is not deleted'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;