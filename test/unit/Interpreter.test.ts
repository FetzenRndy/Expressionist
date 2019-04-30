import { evalUserInput } from "../../src/interpreter/";
import { DefaultOptions } from "../util/DefaultOptions";

describe("Interpreter", () => {
	it("should evaluate {1+1} to 2", () => {
		expect(evalUserInput("{1+1}", DefaultOptions.single)).toEqual("2");
	});

	it("should evaluate nested expressions. {1+{2+2}} to 5", () => {
		expect(evalUserInput("{1+{2+2}}", DefaultOptions.single)).toEqual("5");
	});

	it("should evalulate long strings", () => {
		const source =
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt" +
			"ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et " +
			"ea rebum. Stet clita kasd {1+1} Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy " +
			"eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam " +
			"et justo duo dolores et ea rebum. Stet clita kasd";

		const result =
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt" +
			"ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et " +
			"ea rebum. Stet clita kasd 2 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy " +
			"eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam " +
			"et justo duo dolores et ea rebum. Stet clita kasd";

		expect(evalUserInput(source, DefaultOptions.single)).toEqual(result);
	});
});
