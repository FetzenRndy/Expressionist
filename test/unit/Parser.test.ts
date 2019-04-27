import { T_Factory, tokenize } from "../../src/interpreter/Lexer";
import { NodeKind, buildAST } from "../../src/interpreter/Parser";
import {DefaultOptions} from "../util/DefaultOptions";

describe("Parser AST", () => {
	it("should put the first expression source as the first child of the head", () => {
		const tokens = tokenize("{1+1}", DefaultOptions.single);
		const ast = buildAST(tokens);

		expect(ast.children[0].token).toEqual(T_Factory.Text("1+1"));
		expect(ast.children[0].kind).toEqual(NodeKind.Source);
	});

	it("should put nested expression under each other", () => {
		const tokens = tokenize("{1+{2+2}}", DefaultOptions.single);
		const ast = buildAST(tokens);

		expect(ast.children[0].token).toEqual(T_Factory.Text("1+"));
		expect(ast.children[0].kind).toEqual(NodeKind.Source);

		expect(ast.children[0].children[0].token).toEqual(T_Factory.Text("2+2"));
		expect(ast.children[0].children[0].kind).toEqual(NodeKind.Source);
	});

	it("should add text that is not in a expression as the Text NodeKind", () => {
		const tokens = tokenize("a{1+1}b", DefaultOptions.single);
		const ast = buildAST(tokens);

		expect(ast.children[0].token).toEqual(T_Factory.Text("a"));
		expect(ast.children[0].kind).toEqual(NodeKind.Text);

		expect(ast.children[1].token).toEqual(T_Factory.Text("1+1"));
		expect(ast.children[1].kind).toEqual(NodeKind.Source);

		expect(ast.children[2].token).toEqual(T_Factory.Text("b"));
		expect(ast.children[2].kind).toEqual(NodeKind.Text);
	});

	// it("should work with multiple expression starts", () => {
	//	const tokens = tokenize("{{2+2}+1,}", )
	// });
});
