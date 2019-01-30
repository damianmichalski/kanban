function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}



// Global veriables to connect with server
//var baseUrl = 'https://kodilla.com/pl/bootcamp-api'; /*Podstawowy adres do pobierania danych z servera*/
var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = prefix + 'https://kodilla.com/pl/bootcamp-api';

var myHeaders = {
    'X-Client-Id': '3609',
    'X-Auth-Token': 'c7af3d071d08b2fc54d4b234b20dcc5e',
    // 'Content-Type': 'application/json; charset=utf-8'
};


// Fetch function asking array in server
fetch(baseUrl + '/board', { headers: myHeaders })
    .then(function(resp) {
        return resp.json();
    })
    .then(function(resp) {
        setupColumns(resp.columns);
    });

// Tworzenie kolumn
function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

// Tworzenie kart
function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}