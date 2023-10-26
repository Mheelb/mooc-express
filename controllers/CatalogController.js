const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class CatalogController {

    constructor(data) {
        this.dataFile = `./data/${data}.json`;
    };

    async loadCatalog() {
        const data = await readFile(this.dataFile, "utf-8");
        return JSON.parse(data).produits;
    };

    async getDiscs() {
        const data = await this.loadCatalog();
        return data.map((disc) => {
            return {
                id: disc.id,
                title: disc.title,
                band: disc.band,
                image: disc.image,
            };
        });
    };

    async getDisc(id) {

        const data = await this.loadCatalog();
        const disc = data.find((d) => { return d.id == id });
        if (!disc) { return null };
        return {
            id: disc.id,
            title: disc.title,
            band: disc.band,
            image: disc.image,
        };

    };

    getData() {
        return this.data;
    };
}

module.exports = CatalogController;