var app = {

	players: 0, // FROM 1 TO 4
	gametype: 0, // 1 = QuizKoning, 2 = Het Strijdspel
	score: {
		1: 0,
		2: 0,
		3: 0,
		4: 0
	},
	current_player: 0,
	current_round: 0,

	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

	registerEvents: function() {
		// Pagina wissel
		$(window).on('hashchange', $.proxy(this.route, this));
	},

	route: function() {
		var hash = window.location.hash; // GET HASH from URL (eg: localhost/#this-page > '#this-page')

		// No hashtag? GO TO START
		if (!hash) {
			// Start new view with app.store data
			$('.loading-screen').addClass('show-loading-screen');
			setTimeout(function(){
				$('body .screen').html(new StartView(app.store).render().el);
			}, 1000);
			setTimeout(function(){
				$('.loading-screen').removeClass('show-loading-screen');
			}, 2000);
			
			return;
		} else {
			var page = app.pages[hash];
			var pageHtml = page.render().el; // each page object has the method .render()

			$('.loading-screen').addClass('show-loading-screen');
			setTimeout(function(){
				$('body .screen').html(pageHtml);
			}, 1000);
			setTimeout(function(){
				$('.loading-screen').removeClass('show-loading-screen');
			}, 2000);
			
			return;
		}
	},

	getRandomQuestion: function() {
		var id = Math.floor((Math.random()*15)+1);
		app.store.findById(id, function(questions) {
			// remove each previous popup instance
			$('body .screen').find('.popup').each(function(){
				$(this).remove();
			});
			$('body .screen').append(GameTypeOneView.popupTemplate(questions));
			$('.popup').addClass('show-popup');
		});
	},

	initialize: function() {
		var self = this;
		var initialSet = firstCategory;
		this.pages = {
			"": 						new StartView(app.store), 
			"#":						null,
			"#game-type-selection": 	new GameTypeSelectionView(app.store),
			"#game-type-one":			new GameTypeOneView(app.store)
		};
		this.pages["#"] = this.pages[""]; // Saves memory
		this.registerEvents();
		this.store = new MemoryStore(initialSet, function() {
			self.route();
		});
	}

};

app.initialize();

$(document).ready(function() {
	// Close Popup
	$('body .screen').delegate('.popup .close a', 'click', function(e) {
		e.preventDefault();
		$('.popup').removeClass('show-popup');
	});
	// Close App
	$('body .screen').delegate( '.quit-app', 'click', function(e) {
		e.preventDefault();
		navigator.app.exitApp();
	});

});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
	var hash = window.location.hash;
	if(!hash || hash === '#') {
		navigator.app.exitApp();
	} else {
		navigator.app.backHistory()
	}
}

// POPUP READY
function popupReady() {
	// Randomize answers
	$('.answers').randomize('.answer');
	// Answer actions
	$('.answers a').bind('click', function(e){
		e.preventDefault();
		console.log($(this).data('correct'));
		if ($(this).data('correct') === true) {
			$(this).addClass('correct-answer');
		} else {
			$(this).addClass('wrong-answer');
		}
		setTimeout(function(){
			$('.answers').addClass('hidden');
			$('.explanation').removeClass('hidden');
		}, 2000);
	});
}

// POPUP READY
function startGameTypeOne() {
	console.log('game-type-one started');

	var game = "";
	for ( var i=0; i < app.players ; i++ ) {
		game += '<div class="player">';
		game += '<h1>Speler ' + (i+1) + '</h1>';
		game += '<p>Score <span>' + app.score[i+1] + '</span></p>'; 
		game += '</div>';
	}
	$('.players').html(game).removeClass("hidden");
	$('.overlay').addClass("hidden");
	setTimeout(function(){
		$('.players').children(":first").addClass('current');
		app.current_player = 1;
		app.current_round = 1;
		$('.current-round').html(app.current_round);
	}, 1000);
	setTimeout(function(){
		app.getRandomQuestion();
	}, 2000);
}

function addScore() {
	var cp = app.current_player;
	app.score[cp]++;
	$('.player:nth-child('+app.current_player+') span').html(app.score[cp]);
}

function nextPlayer() {
	if(app.current_player+1 > app.players) {
		app.current_player = 1;
	}
	else {
		app.current_player++;
	}
}

function nextRound() {
	app.current_round++;
	nextPlayer();
	setTimeout(function(){
		$('.current').removeClass('current');
		$('.player:nth-child('+app.current_player+')').addClass('current');
		$('.current-round').html(app.current_round);
	}, 1000);
	setTimeout(function(){
		app.getRandomQuestion();
	}, 2000);
}

(function($) {
	$.fn.randomize = function(childElem) {
		return this.each(function() {
			var $this = $(this);
			var elems = $this.children(childElem);

			elems.sort(function() { return (Math.round(Math.random())-0.5); });  

			$this.empty();  

			for(var i=0; i < elems.length; i++)
				$this.append(elems[i]);
		});    
	}
})(jQuery);



























