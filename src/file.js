const fs = require("fs");

/**
 *
 * @param {String} path Caminho do arquivo que será lido
 * @returns Vetor de string com as linhas
 */
function readFile(path) {
	return fs
		.readFileSync(path)
		.toString()
		.split(/[\n|\n\r]/g);
}

/**
 *
 * @param {String[]} data Vetor de string que será separado em tokens
 * @returns Vetor de tokens
 */
function process(data) {
	var tokens = [];
	var buffer = "";
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (data[i][j] == " ") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
				}
			} else if (data[i][j] == "{") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					tokens.push(data[i][j]);
				}
			} else if (data[i][j] == "}") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					tokens.push(data[i][j]);
				}
			} else if (data[i][j] == "(") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					tokens.push(data[i][j]);
				}
			} else if (data[i][j] == ")") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					tokens.push(data[i][j]);
				}
			} else if (data[i][j] == ";") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "+") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "-") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "*") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "/") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "%") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "<") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == ">") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "!") {
				if (buffer.length > 0) {
					tokens.push(buffer);
					buffer = "";
					buffer = buffer + data[i][j];
				} else {
					buffer = data[i][j];
				}
			} else if (data[i][j] == "=") {
				if (buffer.length > 0) {
					if (/[>|<|!|=]/.test(buffer[0])) {
						buffer = buffer + data[i][j];
					} else {
						tokens.push(buffer);
						buffer = "";
						buffer = buffer + data[i][j];
					}
				} else {
					buffer = data[i][j];
				}
			} else {
				buffer = buffer + data[i][j];
			}
		}
		tokens.push(buffer);
		buffer = "";
	}
	return tokens;
}

module.exports = { readFile, process };
