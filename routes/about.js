const express = require('express');
const router = express.Router();

module.exports = () => {

    router.get('/', (req, res) => {
        res.render('layouts', { 
            title: 'A propose de la boite à musique',
            page : 'about'
        });
    });

    return router;
};