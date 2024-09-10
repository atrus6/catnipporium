const fs = require('node:fs');

module.exports = function() {
	const data = require('./data.json');
	var bigd = {};

	data.forEach(function(item, index) {
		if (item.country in bigd) {
			if (item.state in bigd[item.country]) {
				bigd[item.country][item.state].push([item.name, item.city]);
			} else {
				bigd[item.country][item.state] = [[item.name, item.city],];
			}
		} else {
			var x = item.state;
			bigd[item.country] = {};
			bigd[item.country][item.state] = [[item.name, item.city],];
		}
	});

	return bigd;
}
