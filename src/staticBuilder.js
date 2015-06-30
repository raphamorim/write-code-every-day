var fs = require('fs'),
	kenobi = require('kenobi');

// HOME
var home = {request: false};
home.page = {
	title: 'Write Code Every Day',
	description: '',
	content: ''
};

kenobi(home, '/src/index.ejs', function(page, res, err) {
	if (err) 
		return console.log('[StaticBuilder] Ocurred a error building home!', err);

	fs.writeFile('./index.html', page, function(err) {
		if (err) 
			return console.log('[StaticBuilder] Ocurred a error creating home!', err);

		console.log('[StaticBuilder] Build Success: home')
		console.log(page);
	})
})