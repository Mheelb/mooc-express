const express = require('express');
const router = express.Router();

module.exports = (params) => {

    const { catalogController } = params;

    router.get('/', async (req, res) => {

        const discs = await catalogController.getDiscs();

        res.render('layouts', {
            discs,
            title: 'Voici le catalogue',
            page: 'catalog'
        });

    });

    router.get("/:id", async (req, res) => {

        const disc = await catalogController.getDisc(req.params.id);
        if (disc) {
            return res.render('layouts', {
                disc,
                title: 'Voici le détail du disque',
                page: 'catalog-detail'
            });
        } else {
            return res.render('layouts', {
                title: 'Désolé, le disque n\'existe pas',
                page: 'catalog-nontrouve'
            });
        };
    });

    return router;
};