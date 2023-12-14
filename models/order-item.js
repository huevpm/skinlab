const mongoos = require('mongoose');

const orderItemSchema = mongoos.Schema({
   quantity: {
    type: Number,
    require: true
   },
   product: {
    type: mongoose.Schema.type.ObjectId,
    ref: 'Product'
   }
})

exports.OrderItem = mongoos.model('OrderItem',orderSchema)
