// Create,Store, Import, Export APT

const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        res.status(500).json({message: 'Tài khoản và ID không được tìm thấy'})
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
    return res.status(404).send('Không thể tạo được tài khoản')

    res.send(user);
})
/*--Login email--*/
router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('Không tìm thấy tài khoản');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.user_id
            },
            secret,
            {expiresIn: '1y'}
        )
        res.status(200).send({user: user.email, token: token})
    } else {
        return res.status(400).send('Mật khẩu không đúng!');
    }

    
})

module.exports = router;