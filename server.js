const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser'); 

const port = 3000;

const router = require('./routes');
const CatalogController = require('./controllers/CatalogController');
const catalogController = new CatalogController("catalog");
const ContactController = require('./controllers/ContactController');
const contactController = new ContactController("contact");

const app = express();

app.use(express.static(path.join(__dirname, './phantom')));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'));

fs.readFile(path.join(__dirname, "./data/config.json"), "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        app.locals.siteName = "[Site name]";
        app.locals.socials = [{ url: "#", class: "", label: ""}];
        app.locals.menu = [{  label: "", url: "#"}];
    } else {
        const config = JSON.parse(data);
        app.locals.siteName = config.siteName;
        app.locals.socials = config.socials;
        app.locals.menu = config.menu;
    }
});

app.use((req, res, next) => {
    console.log('Time: ', Date.now, req.method, req.url);
    next();
});

app.use('/', router({
    catalogController,
    contactController
}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});