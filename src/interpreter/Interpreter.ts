import { buildAST, Node, NodeKind } from "./Parser";
import { ExpressionistOptions } from "../Expressionist";
import { tokenize } from "./Lexer";

export function evalUserInput(input: string, options: ExpressionistOptions): string {
	while (true) {
		const firstStartIndex = input.indexOf(options.startChar);

		if (firstStartIndex === -1) {
			return input;
		}

		input = evalExpression(input, firstStartIndex, options);
	}
}

function evalExpression(
	input: string,
	start: number,
	options: ExpressionistOptions
): string {
	const tokens = tokenize(input.substring(start), options);
	const ast = buildAST(tokens);

	return evaluateAST(ast);
}

function evaluateAST(ast: Node): string {
	let result = "";

	for(const child of ast.children) {
		switch(child.kind) {
			case NodeKind.Text:
				result += child.token.source;
				break;
			case NodeKind.Source:
				result += evaluateSourceAST(child);
				break;
			default:
				throw new Error("A Head node as a child node is invalid.");
		}
	}

	return result;
}

function buildSourceFromAST(node: Node, source = ""): string {
	source += node.token.source;

	for(const nested of node.children) {
		if(nested.children.length > 0) {
			source += buildSourceFromAST(nested, source);
		}

		source += nested.token.source;
	}

	return source;
}

function evaluateSourceAST(node: Node): string {
	const source = buildSourceFromAST(node);
	return evalSource(source);
}

function evalSource(source: string) {
	return eval(source);
}
