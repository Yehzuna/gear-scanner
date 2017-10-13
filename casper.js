var
var casper = require('casper').create({
    pageSettings: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        loadImages: false
    }
});

var path = 'https://fr.finalfantasyxiv.com';
var url = '/lodestone/character/more/?order=5&worldname=Omega&classjob=24&page=0';
var characters = [];

casper.start(path + url);

casper.then(function() {
    //this.debugPage();

    characters = this.evaluate(function () {
        var links = document.querySelectorAll('.entry a');

        return Array.prototype.map.call(links, function(e) {
            return e.getAttribute('href');
        });
    });
});

casper.then(function () {
    this.echo(' - ' + characters.join('\n - '));
});

casper.run();
