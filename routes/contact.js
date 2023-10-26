const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

module.exports = (params) => {

    const { contactController } = params;

    router.post('/', [
        check('email').isEmail().normalizeEmail().trim().withMessage('L\'adresse email n\'est pas valide'),
        check('message').isLength({ min: 10 }).trim().escape().withMessage('Le message doit contenir au moins 10 caractères'),
        check('name').isLength({ min: 3 }).trim().escape().withMessage('Le nom doit contenir au moins 3 caractères')
    ], async (req, res) => {

        const errors = validationResult(req);
        const contacts = await contactController.loadContact();

        let message = {};

        if (!errors.isEmpty()) {

            message = { errors: errors.array() };

        } else {

            const { name, email, message } = req.body;
            await contactController.addEntry(name, email, message);
            

        };

        res.render('layouts', {
            title: 'Votre message',
            page: 'contact',
            actualContact: req.body,
            contacts: contacts,
            message: message.errors
        });

    });

    router.get('/', async (req, res) => {

        const contacts = await contactController.loadContact();

        res.render('layouts', { 
            title: 'Messages',
            page: 'message',
            actualContact: req.body,
            contacts: contacts
        });
    });

    return router;
};