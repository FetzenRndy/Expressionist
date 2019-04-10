import { isTextBox } from "./DOMutil";
import { expressionist } from "./expressionist";

// Puts the "randomCase" function in the global window scope. Used for testing.
// TODO: Do processing in background-script so we do not pollute the global namespace.
const randomCase = (input: string) =>
	input
		.split("")
		.map((char: string) =>
			Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
		)
		.join("");

document.addEventListener("keyup", (event: KeyboardEvent) => {
	if (event.keyCode === 13 && event.ctrlKey) {
		if (document.activeElement && isTextBox(document.activeElement)) {
			(document.activeElement as HTMLInputElement).value = expressionist(
				(document.activeElement as HTMLInputElement).value
			);
		}
	}
});
