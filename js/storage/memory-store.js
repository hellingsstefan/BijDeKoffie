var MemoryStore = function( initialData, successCallback, errorCallback ) {
		this.callback = {
			success: successCallback,
			error: errorCallback
		};

		this.questions = initialData || [];

		MemoryStore.callLater( successCallback, null );
	};

MemoryStore.callLater = function(callback, data) {
	if (callback) {
		setTimeout(function() {
			callback(data);
		});
	}
};

MemoryStore.prototype = {

	questions: null, // never do questions: []

	findByName: function(searchKey, callback) {
		var questions = this.questions.filter(function(element) {
			var fullName = element.firstName + " " + element.lastName;
			return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
		});
		MemoryStore.callLater(callback, questions);
	},

	findById: function(id, callback) {
		var questions = this.questions;
		var question = null;
		var i = questions.length;
		for ( ; i--; ) {
			if (questions[i].id === id) {
				question = questions[i];
				break;
			}
		}
		// i = -1 als lust volledig doorloopt
		MemoryStore.callLater(callback, question);
	}

}