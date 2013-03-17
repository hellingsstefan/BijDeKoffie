var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        this.store = new LocalStorageStore();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();

jQuery(document).ready(function($) {
	// SHOW BODY
	$('body').fadeIn('slow');

	// FadeIn Page Switch
	$('a').click(function(e){
		e.preventDefault();
		var loc = $(this).attr('href');
		$('body').fadeOut('slow', function(){
			window.location = loc;
		});
	});
});