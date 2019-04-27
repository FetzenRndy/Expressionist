import { evalUserInput } from "./interpreter/Interpreter";

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
