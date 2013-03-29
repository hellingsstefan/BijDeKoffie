var GameTypeOneView = function(store) {

	this.initialize = function() {
		var self = this;
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(GameTypeOneView.template());
		return this;
	};

	this.initialize();

}

GameTypeOneView.template = Handlebars.compile($("#tpl-game-type-one").html());
GameTypeOneView.popupTemplate = Handlebars.compile($("#tpl-game-type-one-popup").html());