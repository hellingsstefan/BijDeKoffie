var StartView = function(store) {

	this.initialize = function() {
		var self = this;
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		this.el.on('click', '.getRandomQuestion', function( e ) {
			e.preventDefault();
			self.getRandomQuestion();
		});
	};

	this.render = function() {
		this.el.html(StartView.template());
		return this;
	};

	this.getRandomQuestion = function() {
		var id = Math.floor((Math.random()*15)+1);
		store.findById(id, function(questions) {
			// remove each previous popup instance
			$('body .screen').find('.popup').each(function(){
				$(this).remove();
			});
			$('body .screen').append(StartView.popupTemplate(questions));
			$('.popup').addClass('show-popup');
		});
	};

	this.initialize();

}

StartView.template = Handlebars.compile($("#tpl-start").html());
StartView.popupTemplate = Handlebars.compile($("#tpl-popup").html());