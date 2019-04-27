import { T_Factory, tokenize } from "../../src/interpreter/Lexer";

import { DefaultOptions } from "../util/DefaultOptions";

describe("Lexer", () => {
	// Starts

	it("should find starts with a single character", () => {
		const tokens = tokenize("{", DefaultOptions.single);
		expect(tokens[0]).toEqual(T_Factory.ExpressionStart());
	});

	it("should find starts with multiple characters", () => {
		const tokens = tokenize("{{", DefaultOptions.double);
		expect(tokens[0]).toEqual(T_Factory.ExpressionStart());
	});

	// Ends

	it("should find ends a single character", () => {
		const tokens = tokenize("}", DefaultOptions.single);
		expect(tokens[0]).toEqual(T_Factory.ExpressionEnd());
	});

	it("should find ends with multiple characters", () => {
		const tokens = tokenize("}}", DefaultOptions.double);
		expect(tokens[0]).toEqual(T_Factory.ExpressionEnd());
	});

	// Text.

	it("should group all other characters as the 'Text' token type", () => {
		expect(tokenize("abc{1+1}", DefaultOptions.single)).toEqual([
			T_Factory.Text("abc"),
			T_Factory.ExpressionStart(),
			T_Factory.Text("1+1"),
			T_Factory.ExpressionEnd(),
		]);
	});

	it("should parse multiple expressions", () => {
		expect(tokenize("{1+1}{2+2}", DefaultOptions.single)).toEqual([
			T_Factory.ExpressionStart(),
			T_Factory.Text("1+1"),
			T_Factory.ExpressionEnd(),
			T_Factory.ExpressionStart(),
			T_Factory.Text("2+2"),
			T_Factory.ExpressionEnd(),
		])
	});

	it("should not care about whitespace", () => {
		expect(tokenize("a b c { 1 +  2}", DefaultOptions.single)).toEqual([
			T_Factory.Text("a b c "),
			T_Factory.ExpressionStart(),
			T_Factory.Text(" 1 +  2"),
			T_Factory.ExpressionEnd(),
		]);
	});

	it("should not skip the last character", () => {
		expect(tokenize("a{1+1}b", DefaultOptions.single)).toEqual([
			T_Factory.Text("a"),
			T_Factory.ExpressionStart(),
			T_Factory.Text("1+1"),
			T_Factory.ExpressionEnd(),
			T_Factory.Text("b"),
		]);
	});
});
