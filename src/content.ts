function isTextBox(element: Element): boolean {
	const tagName = element.tagName.toLowerCase();

	if (tagName === "textarea") {
		return true;
	}

	if (tagName !== "input") {
		return false;
	}

	const attributeElement = element.getAttribute("type");

	if (attributeElement === null) {
		return false;
	}

	const type = attributeElement.toLowerCase();
	const inputTypes = [
		"text",
		"password",
		"number",
		"email",
		"tel",
		"url",
		"search",
		"date",
		"datetime",
		"datetime-local",
		"time",
		"month",
		"week"
	];

	return inputTypes.indexOf(type) >= 0;
}

class Randomcase {
	/**
	 * A function that transforms a normal string into Randomcase
	 *
	 * @static
	 * @param {String} input
	 * @memberof Randomcase
	 */
	public static transform(input) {
		return input
			.split("")
			.map((char: string) =>
				Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
			)
			.join("");
	}
}

const randomCase = Randomcase.transform;

function expresser(input: string): string {
	const regex = /{(.*?)}/g;
	const expressions = input.match(regex);

	if (!expressions) {
		return input;
	}

	expressions.forEach((expression: string) => {
		const originalExpression = expression;
		let compiledExpression = expression.substring(1, expression.length - 1);

		if (compiledExpression.startsWith("!")) {
			const parts = compiledExpression.split(" ");
			let command = parts[0];
			const args = compiledExpression.replace(command + " ", "");

			command = command.substring(1);

			compiledExpression = `{${command}("${args}")}`;
		}

		// tslint:disable-next-line:no-eval
		const evalResult = eval(compiledExpression);
		input = input.replace(originalExpression, evalResult);
	});

	return input;
}

document.addEventListener("keyup", (event: KeyboardEvent) => {
	if (event.keyCode === 13 && event.ctrlKey) {
		if (document.activeElement && isTextBox(document.activeElement)) {
			(document.activeElement as HTMLInputElement).value = expresser(
				(document.activeElement as HTMLInputElement).value
			);
		}
	}
});
