// Create,Store, Import, Export APT

const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
})


module.exports = router;