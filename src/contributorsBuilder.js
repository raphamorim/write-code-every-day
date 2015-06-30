var Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	octonode = require('octonode'),
	players = require('./../players');	

var users = [],
	client = Promise.promisifyAll(octonode.client());

Promise.map(players, function(player) {
	return client.getAsync('/users/' + player, {})
		.spread(function(status, body, headers) {
  			console.log('[Script] Contributors total: ' + users.length  + ', statusCode: ' + status)
	})
}).then(function() {
	var data = 'module.exports = ' + JSON.stringify(users);
	return fs.writeFileAsync('./src/contributors.js', data)
		.then(function(json) {
			console.log('[Script] Finished!')
		})
})