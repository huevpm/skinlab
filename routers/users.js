// Create,Store, Import, Export APT

const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get(`/`, async (req, res) => {
    const userList = await User.find().select('name phone email');

    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
})

router.get('/:id', async(req, res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found'})
    }
    res.status(200).send(user);
    
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        city: req.body.city,
        district: req.body.district,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
    })
    user = await user.save();

    if(!user)
    return res.status(404).send('the user cannot be created')

    res.send(user);
})


module.exports = router;