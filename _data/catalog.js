const fs = require('fs');
const csv = require('csv-parser');

async function getPillowsData() {
	return new Promise((resolve, reject) => {
		const data = [];
		fs.createReadStream('_data/products.csv')
		.pipe(csv())
		.on('data', (row) => {
			data.push(row);
		})
		.on('end', () => {
			resolve(data);
		})
		.on('error', (err) => {
			reject(err);
		});
	});
}

// Export the data for 11ty
module.exports = async function() {
    const pillows = await getPillowsData();
    return pillows;
};
