import { ExpressionistOptions } from "../Expressionist";
import { T_Factory, Token, TokenKind } from "./Token";

// TODO: This is ugly.
function lex(
	input: string,
	options: ExpressionistOptions,
	definitions: Array<{ match: string | null; make: (match: string) => Token }>
) {
	let tokens = new Array<Token>();

	function tokenMatch(match: string, start: number) {
		return input.substr(start, match.length) === match;
	}

	function getMatch(match: string | null, start: number): string {
		if (match == null) {
			return input[start];
		}

		return input.substr(start, match.length);
	}

	function scanFor(
		match: string | null,
		makeToken: (match: string) => Token
	): (start: number) => boolean {
		return (start: number) => {
			if (match === null) {
				tokens.push(makeToken(getMatch(null, start)));
				return true;
			}

			if (tokenMatch(match, start)) {
				tokens.push(makeToken(getMatch(match, start)));
				return true;
			}

			return false;
		};
	}

	const lexers = Array<ReturnType<typeof scanFor>>();
	for (const definition of definitions) {
		lexers.push(scanFor(definition.match, definition.make));
	}

	for (let index = 0; index < input.length; index++) {
		for (const lexer of lexers) {
			if (lexer(index)) {
				break;
			}
		}
	}

	tokens = joinSources(tokens);

	return tokens;
}

function joinSources(tokens: Token[]): Token[] {
	const joined = new Array<Token>();
	let current = "";

	for (const token of tokens) {
		if (token.kind === TokenKind.Text) {
			current += token.source;

			if (token === tokens[tokens.length - 1]) {
				joined.push(T_Factory.Text(current));
			}
		} else {
			if (current === "") {
				joined.push(token);
			} else {
				joined.push(T_Factory.Text(current));
				joined.push(token);
				current = "";
			}
		}
	}

	return joined;
}

export function tokenize(input: string, options: ExpressionistOptions) {
	return lex(input, options, [
		{
			match: options.startChar,
			make: () => T_Factory.ExpressionStart()
		},
		{
			match: options.endChar,
			make: () => T_Factory.ExpressionEnd()
		},
		{
			match: null,
			make: match => T_Factory.Text(match)
		}
	]);
}

export { T_Factory, Token, TokenKind };
