import { evalUserInput } from "./interpreter/evaluator/Interpreter";

export type ExpressionistOptions = {
	startChar: string;
	endChar: string;
};

export function expressionist(
	input: string,
	options: ExpressionistOptions
): string {
	return evalUserInput(input, options);
}
