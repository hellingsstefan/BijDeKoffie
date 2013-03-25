var ThisView = function(store) {

	this.initialize = function() {
		this.el = $('<div/>');
	};

	this.render = function() {
		this.el.html(ThisView.template());
		return this;
	};

	this.initialize();

}

ThisView.template = Handlebars.compile($("#tpl-this-page").html());