/**
 * Creates a file with extension
 * @param {string} name The file name
 * @param {string} path The directory where the file resides
 * @returns A string containing the filename ptah with extension
 */
function createFileNameWithExtension(name, path) {
	let extension = "";
	if (name) {
		const lastIndexOfDot = name.lastIndexOf(".");
		extension = name.substring(lastIndexOfDot);
	}
	return path + extension;
}

export default createFileNameWithExtension