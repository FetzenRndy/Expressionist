export function expressionist(input: string): string {
	const regex = /{(.*?)}/g;
	const expressions = input.match(regex);

	if (!expressions) {
		return input;
	}

	expressions.forEach((expression: string) => {
		const originalExpression = expression;
		let compiledExpression = expression.substring(1, expression.length - 1);

		if (compiledExpression.match(regex)) {
			compiledExpression = expressionist(compiledExpression);
		}

		// tslint:disable-next-line:no-eval
		const evalResult = eval(compiledExpression);
		input = input.replace(originalExpression, evalResult);
	});

	return input;
}
