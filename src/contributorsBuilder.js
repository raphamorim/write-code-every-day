var Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	octonode = require('octonode'),
	players = require('./../players');	

var users = [],
	client = Promise.promisifyAll(octonode.client());

Promise.map(players, function(player) {
	return client.getAsync('/users/' + player, {})
		.spread(function(status, body, headers) {
  			users.push(body);
  			console.log('[Script] Contributors total: ' + users.length  + ', statusCode: ' + status)
	})
}).then(function() {
	return fs.writeFileAsync('./src/contributors.js', JSON.stringify(users))
		.then(function(json) {
			console.log('[Script] Finished!')
		})
})