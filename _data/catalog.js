const PocketBase = require('pocketbase/cjs');

async function getPillowsData() {
    try {
        // Initialize PocketBase
        const pb = new PocketBase('https://media.mist-toad.ts.net:8890');
        
        // Fetch all records from the Pillows collection
        const records = await pb.collection('Pillows').getFullList({
            //sort: 'Name',
        });
        
        // Map the records to the desired format
        const pillowsData = records.map(pillow => ({
		Image: pb.getFileUrl(pillow, pillow.Image, {"thumb":"512x512f"}),
            Name: pillow.Name,
            Quantity: pillow.Quantity
        }));
        
        return pillowsData;
    } catch (error) {
        console.error('Error fetching pillows data:', error);
        return [];
    }
}

// Export the data for 11ty
module.exports = async function() {
    const pillows = await getPillowsData();
    return pillows;
};
