export enum TokenKind {
	ExpressionStart,
	ExpressionEnd,
	Text
}

export class Token {
	public kind: TokenKind;
	public source: string | null;

	constructor(kind: TokenKind, source: string | null) {
		this.kind = kind;
		this.source = source;
	}
}

export class T_Factory {
	public static Text(source: string): Token {
		return new Token(TokenKind.Text, source);
	}

	public static ExpressionStart(): Token {
		return new Token(TokenKind.ExpressionStart, null);
	}

	public static ExpressionEnd(): Token {
		return new Token(TokenKind.ExpressionEnd, null);
	}
}

