const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ContactController {

    constructor(data) {

        this.dataFile = `./data/${data}.json`;

    };
    
    async loadContact() {

        const data = await readFile(this.dataFile, "utf-8");

        if (!data) return [];
        return JSON.parse(data);

    };

    async addEntry(name, email, message) {

        const data = (await this.loadContact()) || [];
        data.unshift({ name, email, message });

        return writeFile(this.dataFile, JSON.stringify(data), "utf-8");

    };

};

module.exports = ContactController;