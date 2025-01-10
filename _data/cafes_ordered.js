const fs = require('node:fs');

module.exports = function() {
	const data = require('./data.json');
	var bigd = {}; 

	data.forEach(function(item, index) {
		if (!(item.country in bigd)) {
			bigd[item.country] = {};
		}

		if (!(item.state in bigd[item.country])) {
			bigd[item.country][item.state] = {};
		}

		if (!(item.city in bigd[item.country][item.state])) {
			bigd[item.country][item.state][item.city] = [];
		}

		bigd[item.country][item.state][item.city].push(item.name);
	});
	return bigd;
}
