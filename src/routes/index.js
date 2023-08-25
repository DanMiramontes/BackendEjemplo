const express = require('express');
const app = express();
const middlewares = require('../middleware');
const formsRouter = require('./formsRoute');
module.exports = async() =>{
    const { token } = await middlewares();
    
    app.use('/forms',token,formsRouter);

    return app;
}
