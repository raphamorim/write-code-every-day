var Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	octonode = require('octonode'),
	usersStreaks = require('./contributors.streak')
	ghStreak = Promise.promisify(require('gh-streak')),
	challengers = require('./../challengers');	

var users = [],
	hasChanged = false,
	client = Promise.promisifyAll(octonode.client());

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
				users.push(body);
  				console.log('[Script] Contributors total: ' + users.length  + ', statusCode: ' + status)	
			})
	})
}).then(function() {
	users.sort(function(a, b) {
  		return parseFloat(a.longestStreak) - parseFloat(b.longestStreak);
	});
	users.reverse();
	var dataContributors = 'module.exports = ' + JSON.stringify(users), 
		dataContributorsStreak = 'module.exports = ' + JSON.stringify(usersStreaks);

	return fs.writeFileAsync('./src/contributors.js', dataContributors)
		.then(function(json) {
			if (hasChanged) 
				return fs.writeFileAsync('./src/contributors.streak.js', dataContributorsStreak);
			return Promise.resolve();
		})
		.then(function() {
			console.log('[Script] Finished!')
		})
})