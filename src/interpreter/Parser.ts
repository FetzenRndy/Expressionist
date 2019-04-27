import { Token, TokenKind } from "./Lexer";

export enum NodeKind {
	Head,
	Text,
	Source
}

export class Node {
	public readonly kind: NodeKind;
	public readonly token: Token;

	public readonly children: Node[];
	public readonly parent: Node;

	private constructor(kind: NodeKind, value: Token, parent: Node) {
		this.kind = kind;
		this.token = value;
		this.children = [];
		this.parent = parent;
	}

	public static makeHead() {
		return new Node(NodeKind.Head, null!, null!);
	}

	public addChild(kind: NodeKind, token: Token): Node {
		const newNode = new Node(kind, token, this);
		this.children.push(newNode);

		return newNode;
	}
}

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
				previousNestCount = copy(nestCount);
				nestCount++;
				break;
			case TokenKind.ExpressionEnd:
				previousNestCount = copy(nestCount);
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

function copy<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}
