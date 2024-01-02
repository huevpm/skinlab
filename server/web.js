const express = require('express');
const web = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const api = process.env.API_URL;


require('dotenv/config');
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');

// Middleware
web.use(express.json());
web.use(bodyParser.json());
web.use(morgan('tiny'));
web.use('downloadable-files/brancy-html/assets/images/shop', express.static(__dirname + 'downloadable-files/brancy-html/assets/images/shop'));
// web.use(authJwt());
// web.use(errorHandler)
web.use(cors());
web.options('*', cors());

// Routers
const productsRouter = require('../server/routers/products');
const categoriesRouter = require('../server/routers/categories');
const ordersRouter = require('../server/routers/orders');
const usersRouter = require('../server/routers/users');


web.use(`${api}/products`, productsRouter);
web.use(`${api}/categories`, categoriesRouter);
web.use(`${api}/orders`, ordersRouter);
web.use(`${api}/users`, usersRouter);

// Database

// async function connectToDB() {
//     try {
//         await mongoose.connect(process.env.DB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Database connection is ready...');
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//     }
// }
// connectToDB();

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})
const port = process.env.PORT || 3000;
web.listen(port, ()=>{
    console.log(`API is running at ${api}`)
    console.log(`server is running ${port}`);
})