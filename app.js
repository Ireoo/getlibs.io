const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();

const dir = path.join(ROOT, 'libs')
const dirList = fs.readdirSync(dir);

let libs = {};

dirList.forEach((file) => {
    let lib = require(path.join(dir, file));
    if (typeof (lib) === 'object') {
        for (let l in lib) {
            libs[l] = lib[l];
        }
    } else if (typeof (lib) === 'function' || typeof (lib) === 'number' || typeof (lib) === 'string') {
        libs[file.split('.')[0]] = lib;
    } else {
        console.log(`The file "${file}" does not contain exports property or modules.exports property, it is also possible that this file is not a valid lib file!!!`);
    }
});

exports = module.exports = libs;