type ExpressionistOptions = {
	startChar: string,
	endChar: string,
};

export function expressionist(input: string, options: ExpressionistOptions): string {
	const regex = new RegExp(`${options.startChar}(.*?)${options.endChar}`, "g");

	// TODO: Use .exec to get the start index and then parse from there.
	const expressions = input.match(regex);

	if (!expressions) {
		return input;
	}

	replaceWithEval(input, expressions);

	return input;
}

function replaceWithEval(input, expressions) {
	expressions.forEach((expression: string) => {
		// TODO: Can we make this eval safe/-ish ?
		// tslint:disable-next-line:no-eval
		const evalResult = eval(expression);

		input = input.replace(expression, evalResult);
	});

	return input;
}
