module.exports = async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("static/img");
	eleventyConfig.addPassthroughCopy("static/favicon");
	eleventyConfig.addPassthroughCopy("static/css");
};
