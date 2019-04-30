import { Token, TokenKind } from "../lexer/Lexer";
import { Node, NodeKind } from "./Node";

export function buildAST(tokens: Token[]) {
	const head = Node.makeHead();

	let currentBranch = head;

	let nestCount = 0;
	let previousNestCount = 0;

	for (const token of tokens) {
		switch (token.kind) {
			case TokenKind.Text:
				if (nestCount === 0 && previousNestCount === 0) {
					currentBranch.addChild(NodeKind.Text, token);
				} else {
					if (previousNestCount < nestCount) {
						currentBranch = currentBranch.addChild(
							NodeKind.Source,
							token
						);
					} else if (previousNestCount > nestCount) {
						const difference = previousNestCount - nestCount;

						for (let i = 0; i < difference; i++) {
							currentBranch = currentBranch.parent;
						}

						const type =
							nestCount === 0 ? NodeKind.Text : NodeKind.Source;
						currentBranch = currentBranch.addChild(type, token);
					} else {
						currentBranch.addChild(NodeKind.Source, token);
					}
				}

				break;
			case TokenKind.ExpressionStart:
				previousNestCount = shallowCopy(nestCount);
				nestCount++;
				break;
			case TokenKind.ExpressionEnd:
				previousNestCount = shallowCopy(nestCount);
				nestCount--;
				break;
			default:
				throw new Error(
					`Unimplemented token encountered in Parser! Kind was: ${
						token.kind
					}`
				);
		}
	}

	return head;
}

function shallowCopy<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}
