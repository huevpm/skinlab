
const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();


// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg'
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP [file.mimetype];
//         let uploadError = new Error ('Invalid image type');

//         if (isValid) {
//             uploadError = null
//         }
//       cb(uploadError, 'downloadable-files/brancy-html/assets/images/shop')
//     },

//     filename: function (req, file, cb) {
//       const fileName = file.originalname.split(' ').join('-');
//       const extension = FILE_TYPE_MAP [file.mimetype];
//       cb(null, fileName + '-' + Date.now())
//     }
//   })
  
//   const uploadOptions = multer({ storage: storage })

// Get all products
router.get('/', async (req, res) => {

    let filter = {}
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
})

// Get product details
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    }
    res.send(product);
})

// Create new product

router.post(`/`, async (req, res) =>{
    try {
        console.log(req.body.category)
        console.log(req.body)
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send('Invalid Category');
        }

        const newProduct = new Product({
            product_id: req.body.product_id,
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            dateCreated: req.body.dateCreated,
        });

        const product = await newProduct.save();
        res.send(product);
    } catch (error){
        if(!product)
        return res.status(500).send('The product cannot be created');
    }
});

// Get product by id
router.put('/:id', async (req, res) =>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            product_id: req.body.product_id,
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images:req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            dateCreated: req.body.dateCreated,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated')

    res.send(product);
})


// Delete product
router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product) {
            return res.status(200).json({success: true, message: 'product is deleted'})
        } else {
            return res.status(404).json({success: false, message: 'the product is not found'})
     }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    }) 
})
// xem số lượng SP đã có
router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments();

    if(!productCount) {
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount 
    });
})

router.get('/get/featured:count', async (req, res) => {
    const count = req.params.count ? req.params.count: 0
    const products = await Product.find({isFeatured: true}).limit(+count)

    if(!products) {
        res.status(500).json({success: false})
    }
    res.send(products);
})


module.exports = router;