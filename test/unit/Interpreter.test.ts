import { evalUserInput } from "../../src/interpreter/Interpreter";
import { DefaultOptions } from "../util/DefaultOptions";

describe("Interpreter", () => {
	it("should evaluate {1+1} to 2", () => {
		expect(evalUserInput("{1+1}", DefaultOptions.single)).toEqual("2");
	});

	it("should evaluate nested expressions. {1+{2+2}} to 5", () => {
		expect(evalUserInput("{1+{2+2}}", DefaultOptions.single)).toEqual("5");
	});
});
