const fs = require('fs');
const upath = require('upath');
const http = require('http-wrapper');
const { js_beautify: beautify } = require('js-beautify');
const joaat = require('../lib/joaat');
const CONFIG = require('../config');

const dictionary = {};
console.log(upath.normalize(`./output/${CONFIG.FILE_NAMES.DICTIONARY}`));
http.get(CONFIG.URLS.TUNABLE_NAMES).then((response) => {
    response.content.toString().split(/\r?\n/).forEach(line => {
        if (line.length) dictionary[line] = joaat(line);
    });
    if (Object.keys(dictionary).length) fs.writeFile(upath.normalize(`./output/${CONFIG.FILE_NAMES.DICTIONARY}`), beautify(JSON.stringify(dictionary)), () => { if (CONFIG.DEBUG) console.log('Tunables Dictionary downloaded'); });
});

http.get(CONFIG.URLS.TUNEABLES_PROCESSING).then((response) => {
    fs.writeFile(upath.normalize(`./output/${CONFIG.FILE_NAMES.TUNEABLES_PROCESSING}`), response.content.toString(), () => { if (CONFIG.DEBUG) console.log('Tunables Processing downloaded'); });
});
