var GameTypeSelectionView = function(store) {

	this.initialize = function() {
		var self = this;
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(GameTypeSelectionView.template());
		return this;
	};

	this.initialize();

}

GameTypeSelectionView.template = Handlebars.compile($("#tpl-game-type-selection").html());