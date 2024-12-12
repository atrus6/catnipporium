module.exports = async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("static/img");
	eleventyConfig.addPassthroughCopy("static/favicon");
};
