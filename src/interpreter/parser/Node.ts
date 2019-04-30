import { Token } from "../lexer/Token";

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
