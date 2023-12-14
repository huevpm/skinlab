// Create,Store, Import, Export APT

const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();


router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
        path: 'OrderItems', populate: {
            path: 'product', populate: 'category'}
        });

    if(!order) {
        res.status(500).json({success: false})
    }
    res.send(order);
})

router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map( async orderItems =>{
        let newOrderItem = new OrderItem({
            quantity: orderItems.quantity,
            product: orderItems.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
     const orderItemsIdsResolved = await orderItemsIds


    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        district: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
        dateOrdered: req.body.dateOrdered,

    })
    order = await order.save();

    if(!order)
    return res.status(404).send('the order cannot be created')

    res.send(order);
})

// router.post(`/`, (req, res) =>{
//     const product = new Product({
//         name: req.body.name,
//         image: req.body.image,
//         countInStock: req.body.countInStock
//     })

//     product.save().then((createdProduct=>{
//         res.status(201).json(createdProduct)
//     })).catch((err)=> {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// })

module.exports = router;