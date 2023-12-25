const express = require('express');
const web = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');



require('dotenv/config');
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');


// Middleware
web.use(express.json());
web.use(bodyParser.json());
web.use(morgan('tiny'));
// web.use(authJwt());
// web.use(errorHandler)

// Routers
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');

const api = process.env.API_URL;


web.use(`${api}/products`, productsRouter);
web.use(`${api}/categories`, categoriesRouter);
web.use(`${api}/orders`, ordersRouter);
web.use(`${api}/users`, usersRouter);

// Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

web.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})