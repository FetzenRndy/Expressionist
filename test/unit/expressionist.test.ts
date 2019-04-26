import { expressionist } from "../../src/expressionist";

const defaultOptions = {
	startChar: "{",
	endChar: "}"
};

describe("Expressionist", () => {
	it("Should parse simple expressions", () => {
		expect(expressionist("{1+1}", defaultOptions)).toEqual("2");
	});

	it("should parse nested expressions", () => {
		expect(expressionist("{1+{1+1}}", defaultOptions)).toEqual("3");
	});
});
