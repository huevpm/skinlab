const {expressjwt: expressjwt} = require('express-jwt');
// var expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    // /skinlab/downloadable-files/brancy-html
    // /api/v1
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    })
    .unless({
        path: [
            {url: /\/skinlab\/downloadable-files\/brancy-html\/products(.*)/, methods: ['GET', 'OPTION']},
            {url: /\/skinlab\/downloadable-files\/brancy-html\/categories(.*)/, methods: ['GET', 'OPTION']},
            `${api}/skinlab/downloadable-files/brancy-html`, //ex, co the thay doi
            `${api}/skinlab/downloadable-files/brancy-html`,
        ]
    });
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    
    done();
}

module.exports = authJwt;