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
            { url: /(.*)/},
            { url: /\/public\/upload(.*)/},
            { url: /\/skinlab\/skinlab-html\/products(.*)/},
            { url: /\/skinlab\/skinlab-html\/categories(.*)/},
            { url: /\/skinlab\/skinlab-html\/users(.*)/},
            { url: /\/skinlab\/skinlab-html\/orders(.*)/},
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