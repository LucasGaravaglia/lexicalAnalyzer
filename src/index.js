const { state, transition } = require("./automato");
const { readFile, process } = require("./file");
const readline = require("readline-sync");

/**
 * Objeto que contém os estados da classe de token de marcação
 */
const markingClass = () => {
	var states = [new state("q0", true)];
	states[0].newTransition("{", "q0", "q0");
	states[0].newTransition("}", "q0", "q0");
	return { states };
};
/**
 * Objeto que contém os estados da classe de token marcação de função
 */
const functionMarkerClass = () => {
	var states = [new state("q0", true)];
	states[0].newTransition("(", "q0", "q0");
	states[0].newTransition(")", "q0", "q0");
	return { states };
};
/**
 * Objeto que contém os estados da classe de token variáveis
 */
const variableClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", true),
		new state("Identificador mal formado", false),
	];
	states[0].newTransition("_", "q1", "q0");
	states[0].newTransition("", "q1", "q0", /[a-z]/);
	states[1].newTransition("_", "q1", "q1");
	states[1].newTransition("", "q1", "q1", /[a-z]/i);
	states[1].newTransition("", "q1", "q1", /[0-9]/i);
	states[1].newTransition(
		"",
		"Identificador mal formado",
		"q1",
		/[!|@|#|$|%|¨|&|*|(|)|:|?|,]?/i
	);

	return { states };
};
/**
 * Objeto que contém os estados da classe de token números
 */
const numberClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", true),
		new state("q2", false),
		new state("q3", true),
		new state("Numero mal formado", false),
	];
	states[0].newTransition("", "q1", "q0", /[0-9]/i);
	states[1].newTransition("", "q1", "q1", /[0-9]/i);
	states[1].newTransition(".", "q2", "q1");
	states[1].newTransition(
		"",
		"Numero mal formado",
		"q1",
		/[a-z|!|@|#|$|%|¨|&|*|(|)|:|?|,|_|/|;|:]/i
	);
	states[2].newTransition("", "q3", "q2", /[0-9]/i);
	states[2].newTransition(
		"",
		"Numero mal formado",
		"q2",
		/[a-z|!|@|#|$|%|¨|&|*|(|)|:|?|,|_|/|;|:]/i
	);
	states[3].newTransition("", "q3", "q3", /[0-9]/i);
	states[3].newTransition(
		"",
		"Numero mal formado",
		"q3",
		/[a-z|!|@|#|$|%|¨|&|*|(|)|:|?|,|_|/|;|:]/i
	);

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de laço de repetição
 */
const loopClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", false),
		new state("q2", false),
		new state("q3", false),
		new state("q4", false),
		new state("q5", true),
	];
	states[0].newTransition("w", "q1", "q0");
	states[1].newTransition("h", "q2", "q1");
	states[2].newTransition("i", "q3", "q2");
	states[3].newTransition("l", "q4", "q3");
	states[4].newTransition("e", "q5", "q4");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de retorno de função
 */
const functionReturnClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", false),
		new state("q2", false),
		new state("q3", false),
		new state("q4", false),
		new state("q5", false),
		new state("q6", true),
	];
	states[0].newTransition("r", "q1", "q0");
	states[1].newTransition("e", "q2", "q1");
	states[2].newTransition("t", "q3", "q2");
	states[3].newTransition("u", "q4", "q3");
	states[4].newTransition("r", "q5", "q4");
	states[5].newTransition("n", "q6", "q5");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de condição
 */
const functionConditionalClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", false),
		new state("q2", true),
	];
	states[0].newTransition("i", "q1", "q0");
	states[1].newTransition("f", "q2", "q1");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token do tipo integer
 */
const integerTypeClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", false),
		new state("q2", false),
		new state("q3", true),
	];
	states[0].newTransition("i", "q1", "q0");
	states[1].newTransition("n", "q2", "q1");
	states[2].newTransition("t", "q3", "q2");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de atribuição
 */
const assignmentClass = () => {
	var states = [new state("q0", false), new state("q1", true)];
	states[0].newTransition("=", "q1", "q0");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de expressões lógicas
 */
const expressionsClass = () => {
	var states = [
		new state("q0", false),
		new state("q1", false),
		new state("q2", true),
		new state("q3", true),
	];
	states[0].newTransition("=", "q1", "q0");
	states[0].newTransition("!", "q1", "q0");
	states[0].newTransition(">", "q3", "q0");
	states[0].newTransition("<", "q3", "q0");
	states[1].newTransition("=", "q2", "q1");
	states[3].newTransition("=", "q2", "q3");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de operadores matemáticos
 */
const operatorClass = () => {
	var states = [new state("q0", false), new state("q1", true)];
	states[0].newTransition("+", "q1", "q0");
	states[0].newTransition("-", "q1", "q0");
	states[0].newTransition("*", "q1", "q0");
	states[0].newTransition("/", "q1", "q0");
	states[0].newTransition("%", "q1", "q0");

	return { states };
};
/**
 * Objeto que contém os estados da classe de token de final de linha
 */
const endLineClass = () => {
	var states = [new state("q0", false), new state("q1", true)];
	states[0].newTransition(";", "q1", "q0");
	return { states };
};
/**
 * Objeto que simula o funcionamento de um automato.
 * @param {states[]} states Vetor de estados ja instanciados.
 */
const automaton = (states) => {
	var error;
	const indexOf = (name) => {
		for (var i = 0; i < states.length; i++) {
			if (states[i].getName() == name) return i;
		}
	};
	const execute = (word) => {
		var currentState = "q0";
		var currentWordPosition = 0;
		for (var i = 0; i < word.length; i++, currentWordPosition++) {
			currentState = states[indexOf(currentState)].getNextState(
				word[currentWordPosition]
			);
			if (currentState == false) {
				return false;
			}
			if (currentState == "Identificador mal formado")
				this.error = currentState;
			else if (currentState == "Numero mal formado") this.error = currentState;
			else this.error = "Nao pertence a nenhuma classe de token";
		}
		return states[indexOf(currentState)].isFinal;
	};
	const getError = () => {
		return this.error;
	};
	return {
		execute,
		getError,
	};
};

/**
 * Lista das classes de tokens
 */
const tokens = [
	/** 0*/ markingClass(),
	/** 1*/ functionMarkerClass(),
	/** 2*/ loopClass(),
	/** 3*/ functionReturnClass(),
	/** 4*/ functionConditionalClass(),
	/** 5*/ integerTypeClass(),
	/** 6*/ assignmentClass(),
	/** 7*/ expressionsClass(),
	/** 8*/ operatorClass(),
	/** 9*/ endLineClass(),
	/** 10*/ numberClass(),
	/** 11*/ variableClass(),
];

function analyzer(path) {
	try {
		const dataFile = readFile(path);
		console.log("Código fonte: ");
		dataFile.forEach((item) => {
			console.log(item);
		});
		const data = process(dataFile);
		let valid = false;
		let lexicalError;
		for (let j = 0; j < data.length; j++) {
			for (let i = 0; i < tokens.length; i++) {
				if (automaton(tokens[i].states).execute(data[j])) {
					valid = true;
					break;
				}
			}
			if (!valid) console.log("-->", data[j], automaton().getError());
			valid = false;
		}
		console.log("Concluído !");
	} catch (err) {
		console.log("Erro ao abrir o arquivo.");
		console.log(err);
	}
}

const path = readline.question("Digite o caminho do arquivo: ");
console.clear();
analyzer(path);
readline.question();
