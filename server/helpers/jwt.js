require('dotenv').config();

const {expressjwt: expressjwt} = require('express-jwt');
// var expressJwt = require('express-jwt');

function authJwt() {
    // const secret = process.env.secret;
    const api = process.env.API_URL;

    // /skinlab/downloadable-files/brancy-html
    // /api/v1
    module.exports = expressJwt({
        secret: process.env.SECRET,
        api: process.env.API_URL,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    })
    .unless({
        path: [
            // {url: /\/downloadable-files\/brancy-html\/assets\/images\/shop(.*)/, methods: ['GET', 'OPTION']},
            // {url: /\/skinlab\/downloadable-files\/brancy-html\/products(.*)/, methods: ['GET', 'OPTION']},
            // {url: /\/skinlab\/downloadable-files\/brancy-html\/categories(.*)/, methods: ['GET', 'OPTION']},
            // `${api}/skinlab/downloadable-files/brancy-html`, //ex, co the thay doi
            // `${api}/skinlab/downloadable-files/brancy-html`,
            { url: /(.*)/},
            { url: /\/public\/upload(.*)/},
            { url: /\/skinlab\/downloadable-files\/brancy-html\/products(.*)/},
            { url: /\/skinlab\/downloadable-files\/brancy-html\/categories(.*)/},
            { url: /\/skinlab\/downloadable-files\/brancy-html\/users(.*)/},
            { url: /\/skinlab\/downloadable-files\/brancy-html\/orders(.*)/},
            `${api}/orders/get/userorders/`,
            `${api}/orders/get/`,
            `${api}/orders/get/count`,
            `${api}/products/get/`,
            `${api}/products/get/count`,
            `${api}/categories/get/`,
            `${api}/categories/get/count`,
            `${api}/users/get/`,
            `${api}/users/get/count`,
            `${api}/users/get/`,
        ]
    });
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    
    done();
}

// module.exports = authJwt;