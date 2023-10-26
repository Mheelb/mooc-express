const express = require('express');
const router = express.Router();

const catalog = require('./catalog');
const about = require('./about');
const contact = require('./contact');

module.exports = (params) => {

    router.get('/', (req, res) => {
        try {
            res.render('layouts', { 
                title: 'Bienvenue sur la boite à musique',
                page : 'index'
            });
        } catch (error) {
            res.render('layouts', { 
                title: 'Une erreur est survenue',
                error,
                page : 'erreur'
            });
        };
    });
    
    router.use('/catalog', catalog(params));
    router.use('/about', about());
    router.use('/contact', contact(params));
    router.use('/message', contact(params));

    router.use((req, res) => {

        res.status(404).render('layouts', { 
            title: "Cette page n'existe pas",
            error: false,
            page : 'erreur'
        });
    });

    return router;
};