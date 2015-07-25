var fs = require('fs'),
	contributors = require('./contributors'),
	kenobi = require('kenobi');

// HOME
var home = {request: false};
home.users = contributors;
home.page = {
	title: 'Write Code Every Day',
	description: 'A project to honor those developers who believed in the challenge'
};

kenobi(home, '/src/index.ejs', function(page, res, err) {
	if (err) 
		return console.log('[StaticBuilder] Ocurred a error building home!', err);

	fs.writeFile('./index.html', page, function(err) {
		if (err) 
			return console.log('[StaticBuilder] Ocurred a error creating home!', err);

		console.log('[StaticBuilder] Build Success: home')
	})
})