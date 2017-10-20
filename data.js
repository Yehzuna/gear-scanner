const request = require('request');
const cheerio = require('cheerio');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const url = '/lodestone/worldstatus/';
const options = {
    baseUrl: 'https://fr.finalfantasyxiv.com',
    url: url,
    headers: {
        // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
    }
};

request(options, (error, response, html) => {
    if (error) throw error;

    const $ = cheerio.load(html);

    let realms = [];
    $('.heading--md').each(function() {
        let realm = $(this).text();
        $(this).next().find('h3').each(function() {
            realms.push({
                realm: $(this).text(),
                group: realm
            });
        });
    });

    //console.log(JSON.stringify(realms));

    MongoClient.connect('mongodb://localhost/gear-scanner', (error, db) => {
        if (error) throw error;

        db.collection('realms').insertMany(realms, null, (err, res) => {
            if (err) throw err;
            console.log(res);
        });

        db.close();
    });

    fs.writeFile('json/realms.json', JSON.stringify(realms), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});

