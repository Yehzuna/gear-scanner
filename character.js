const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = '/lodestone/character/13192948/';
const options = {
    baseUrl: 'https://fr.finalfantasyxiv.com',
    url: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    }
};

request(options, function (error, response, html) {
    if (!error) {
        fs.writeFile('character.html', html);
    }
});

