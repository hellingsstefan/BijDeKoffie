var AnotherView = function(store) {

	this.initialize = function() {
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(AnotherView.template());
		return this;
	};

	this.initialize();

}

AnotherView.template = Handlebars.compile($("#tpl-another-page").html());