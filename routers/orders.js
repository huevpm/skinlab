// Create,Store, Import, Export APT

const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const { Category } = require('../models/category');
const { default: mongoose } = require('mongoose');
const router = express.Router();


router.get(`/`, async (req, res) => {
    const orderList = await Order.find()
    .populate('user', 'user_name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'user_name')
    .populate(
        {
            path: 'orderItems',
            populate: {
                path: 'product',
                    populate: 'category'
                }
        }
        );

    if(!order) {
        res.status(500).json({success: false})
    }
    res.send(order);
})

router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map( async orderItem =>{
        let newOrderItem = new OrderItem({
            product: orderItem.product,
            quantity: orderItem.quantity,
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }));
    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b, 0)

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        district: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
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

    router.put('/:id', async(req, res)=> {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {new:true}
        )
        if(!order)
        return res.status(400).send('the category cannot be created')

        res.send(order)
    })

    router.delete('/:id', (req, res)=>{
        Order.findByIdAndRemove(req.params.id).then(order =>{
            if(order) {
                return res.status(200).json({success: true, message: 'The order is deleted'})
            } else {
                return res.status(404).json({success: false, message: 'the order is not deleted'})
            }
        }).catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    })
    
    router.get('/get/totalsales', async (req, res) => {
        const totalSales = await Order.aggregate([
            { $group: { _id: null , totalSales : { $sum : '$totalPrice '}}}
            
        ])
        if(!totalSales){
            return res.status(400).send ('The order sales cannot be genrated ')
        }
        res.send({totalSales:totalSales.pop().totalSales})

    })

    router.get('/get/count', async (req, res) => {
        const orderCount = await Order.countDocuments((count) => count);
    
        if(!orderCount) {
            res.status(500).json({success: false})
        }
        res.send({
            orderCount: orderCount
            
        });
    })

    router.get(`/get/userorders/:userid`, async (req, res) => {
        const userorderList = await Order.find({user: req.params.userid}).populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'}
            }).sort({'dateOrdered': -1});
    
        if(!orderList) {
            res.status(500).json({success: false})
        }
        res.send(userorderList);
    })
module.exports = router;