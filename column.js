function Column(id, name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.class = name.replace(/\s/g, '').toLowerCase();
    this.element = generateTemplate('column-template', { name: this.name, id: this.id, class:this.class  });
    var classError = this.class;

    this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('close')) {
            self.removeColumn();
        }

        if (event.target.classList.contains('add-card')) {
            var windowPrompt = prompt("Enter the name of the card");
            if (windowPrompt != "" && windowPrompt != null) {
                self.addCard(new Card(windowPrompt));
                return;
            } else {
                console.log('.errors-column-'+klasa);
                document.querySelector('.errors-column-'+classError).innerHTML = "Nie została podana żadna wartość!";
                return false;
            }
        }
    });
}
Column.prototype = {
    addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function() {
        this.element.parentNode.removeChild(this.element);
    }
};