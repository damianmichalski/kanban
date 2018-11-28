var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
        this.element.appendChild(column.element);
        initSortable(column.id); //About this feature we will tell later
    },
    element: document.querySelector('#board .column-container')
};
function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
    });
}
document.querySelector('#board .create-column').addEventListener('click', function() {
    var name = prompt('Enter a column name');
    if(name != '' && name != null){
        var column = new Column(name);
        board.addColumn(column);
    } else {
        document.querySelector('.errors-board').innerHTML = "Nie została podana żadna wartość!";
        return false;
    }

});