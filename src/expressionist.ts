// TODO: Maybe take a "options" argument with config.
export function expressionist(input: string): string {
	// TODO: Dynamically build this regex. Maybe later we want to have multiple start/end characters.
	const regex = /{(.*?)}/g;

	// TODO: Use .exec to get the start index and then parse from there.
	const expressions = input.match(regex);

	if (!expressions) {
		return input;
	}

	expressions.forEach((expression: string) => {
		// TODO: Can we make this eval safe/-ish ?
		// tslint:disable-next-line:no-eval
		const evalResult = eval(expression);

		input = input.replace(expression, evalResult);
	});

	return input;
}
