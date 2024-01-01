const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-password');

    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
})
// Get user by id
router.get('/:id', async(req, res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash -password');

    if(!user) {
        res.status(500).json({message: 'Tài khoản và ID không được tìm thấy'})
    }
    res.status(200).send(user);
    
})
// Create a new user
router.post('/', async (req, res) => {
    let user = new User({
        user_name: req.body. user_name,
        user_email: req.body. user_email,
        user_phone: req.body. user_phone,
        password: bcrypt.hashSync(req.body.password, 10),
        province: req.body.province,
        district: req.body.district,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        review: req.body.review,
    })
    user = await user.save();

    if(!user)
    return res.status(404).send('Không thể tạo được tài khoản')

    res.send(user);
})
// Get user by id
router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.password;
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            user_name: req.body.name,
            user_email: req.body.email,
            password: newPassword,
            user_phone: req.body.phone,
            province: req.body.province,
            district: req.body.district,
            address: req.body.address,
            isAdmin: req.body.isAdmin,
            review: req.body.review,
        },
        {new: true}
    )

    if(!user)
    return res.status(404).send('Không thể tìm thyas tài khoản')

    res.send(user);
})

/*--Login email--*/
router.post('/login', async (req, res) => {
    const user = await User.findOne({ user_email: req.body. user_email})
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('Không tìm thấy tài khoản');
    }

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn: '1y'}
        )
        res.status(200).send({user: user. user_email, token: token})
    } else {
        res.status(400).send('Mật khẩu không đúng!');
    }
})

router.post('/register', async (req,res)=> {
    let user = new User({
        user_name: req.body.name,
        user_email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        user_phone: req.body.phone,
        province: req.body.province,
        district: req.body.district,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        review: req.body.review,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('Tạo tài khoản không thành công')

    res.send(user);
})

//Delete User
router.delete('/:id', (req, res) =>{
    User.findByAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'Tài khoản được tạo thành công'})
        } else {
            return res.status(404).json({success: false, message: 'Tạo tài khoản không thành công'})
        }
    }).catch(err =>{
        return res.status(500).json({success: false, error: err})
    })
})

// Count user
router.get('/get/count', async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
})

// Edit user info
router.put('/:id', async (req, res)=> {
    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.password;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            user_name: req.body.name,
            user_email: req.body.email,
            password: newPassword,
            user_phone: req.body.phone,
            province: req.body.province,
            district: req.body.district,
            address: req.body.address,
            isAdmin: req.body.isAdmin,
            review: req.body.review,
        },
        { new: true}
    )
    if(!user)
    return res.status(400).send('Tạo tài khoản không thành công')
    
    res.send(user);
})

module.exports = router;