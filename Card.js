// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardEdit = $('<button class="btn">Edytuj kartę</button>'); 
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardEdit.click(function(){
			self.changeCardName();
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.append(cardEdit);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.element.remove();
			}
		});
	},
	changeCardName: function() {
		var self = this;
		var nowaNazwa = prompt('Podaj nową nazwę');
		$.ajax({ /*nie działa,dlaczego?*/
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: nowaNazwa,
			},
			success: function() {
				self.name = nowaNazwa;
				cardDescription.text(self.name);
			}
		});
	}
};