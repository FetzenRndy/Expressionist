import { expressionist } from "../../src/Expressionist";

describe("Expressionist", () => {
	it("should throw an error if the start and end char are the same", () => {
		expect(() =>
			expressionist("~1+1~", {
				interpreter: {
					startChar: "~",
					endChar: "~"
				}
			})
		).toThrow();
	});
});
