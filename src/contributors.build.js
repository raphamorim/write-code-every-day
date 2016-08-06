var Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	octonode = require('octonode'),
	usersStreaks = require('./contributors.streak'),
	ghStreak = Promise.promisify(require('gh-streak')),
	challengers = require('./../challengers'),
	env = Promise.promisify(require('node-env-file')),
	envPath = __dirname + '/../.env';

env(envPath);

var users = [],
	hasChanged = false,
	client = Promise.promisifyAll(octonode.client(process.env.GITHUB_TOKEN));

console.log('[contributors.build] Total: ', challengers.length);
Promise.map(challengers, function(challenger) {
	return client.getAsync('/users/' + challenger, {})
		.spread(function(status, body, headers) {
			return ghStreak(challenger).then(function(currentStreak) {
				if (!usersStreaks[challenger] || usersStreaks[challenger] < currentStreak) {
					hasChanged = true;
					usersStreaks[challenger] = currentStreak;
				}

				if (!body.name)
					body.name = '-';
				if (body.name.length >= 18)
					body.name = body.name.slice(0, 18);

				body.longestStreak = usersStreaks[challenger];
				challengers[(challengers.indexOf(challenger))] = body;
  				console.log('[contributors.build] user: ' + challenger + ' • statusCode: ' + status);
			})
	}).catch(function(e) {
		if (e.statusCode && e.statusCode === 404)
			console.log('404: ', challenger)
		console.log(e);
	})
}).then(function() {
	var dataContributors = 'module.exports = ' + JSON.stringify(challengers),
		dataContributorsStreak = 'module.exports = ' + JSON.stringify(usersStreaks);

	return fs.writeFileAsync('./src/contributors.js', dataContributors)
		.then(function(json) {
			if (hasChanged)
				return fs.writeFileAsync('./src/contributors.streak.js', dataContributorsStreak);
			return Promise.resolve();
		})
		.then(function() {
			console.log('[contributors.build] Finished!');
		});
})