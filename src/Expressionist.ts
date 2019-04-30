import { evalUserInput } from "./interpreter/evaluator/Interpreter";

export type ExpressionistOptions = {
	interpreter: InterpreterOptions;
};

export type InterpreterOptions = {
	startChar: string;
	endChar: string;
};

export function expressionist(
	input: string,
	options: ExpressionistOptions
): string {
	return evalUserInput(input, options.interpreter);
}
