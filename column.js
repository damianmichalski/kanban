function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'Nie podałeś nazwy';
  this.element = generateTemplate('column-template', {name: this.name, id: this.id});

  this.element.querySelector('.column').addEventListener('click', function (event) {
    if (event.target.classList.contains('close-column')) {
      self.removeColumn();
    }

    if (event.target.classList.contains('add-card')) {
      var cardName = prompt('Enter the name of the card');
      if (cardName === null) {
        document.querySelector('.errors-board').innerHTML = "Nie została podana żadna wartość!";
        return;
      }
      if (cardName.trim() == ''){
        document.querySelector('.errors-board').innerHTML = "Nie podałeś nazwy!";
        return;
      }


        document.querySelector('.errors-board').innerHTML = "";
        var data = new FormData();
        data.append('name', cardName);
        data.append('bootcamp_kanban_column_id', self.id);

        fetch(baseUrl + '/card', {
          method: 'POST',
          headers: myHeaders,
          body: data,
        })
            .then(function (resp) {
              return resp.json();
            })
            .then(function (resp) {
              self.addCard(new Card(resp.id, cardName));
            });

    }
  });
}

Column.prototype = {
  addCard: function (card) {
    this.element.querySelector('ul').appendChild(card.element);
  },
  removeColumn: function () {
    var self = this;
    fetch(baseUrl + '/column/' + self.id, {method: 'DELETE', headers: myHeaders})
        .then(function (resp) {
          return resp.json();
        })
        .then(function (resp) {
          self.element.parentNode.removeChild(self.element);
        });
  }
};