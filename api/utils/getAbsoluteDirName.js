import path from "path";
import { fileURLToPath } from "url";

/**
 * Gets the valid absolute path directory file URL supporting cross-platform.
 */
function getDirName(moduleUrl) {
	const filename = fileURLToPath(moduleUrl);
	return path.dirname(filename);
}

export { getDirName };
