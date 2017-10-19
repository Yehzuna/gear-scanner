const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = '/lodestone/character/more/?order=5&worldname=Omega&classjob=24&page=0';
const options = {
    baseUrl: 'https://fr.finalfantasyxiv.com',
    url: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    }
};






function getCharacters(url) {

    request(options, function (error, response, html) {
        if (!error) {
            const $ = cheerio.load(html);

            //fs.writeFile('current.html', html);

            $('.entry a').each(function() {
                characters.push({
                    url: $(this).attr('href'),
                    name: $('.entry__name', this).text(),
                    level: $('.list__ic__class', this).next().text(),
                });
            });
        }
    });
}



