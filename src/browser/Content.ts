import { isTextBox } from "../DOMutil";
import { expressionist } from "../expressionist";

// Puts the "randomCase" function in the global window scope. Used for testing.
// TODO: Do processing in background-script so we do not pollute the global namespace.
const randomCase = (input: string) =>
	input
		.split("")
		.map((char: string) =>
			Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
		)
		.join("");

/*
 * Attach a "keyup" event-handler to the document.
 *
 * Everytime this handler fires, check if we should process the text.
 * If we should invoke the `expressionist` function and set the current
 * text-inputs token to the result.
 */
document.addEventListener("keyup", (event: KeyboardEvent) => {
	// Check if we should process the content.
	// Currently checks for the alt+enter key combo.
	// TODO: Make this configurable.
	if (event.keyCode === 13 && event.ctrlKey) {
		// Check if a element is active and check if the current element is a textbox.
		if (document.activeElement && isTextBox(document.activeElement)) {
			// If we have a text box, process the input and set the result to the token of the input box
			(document.activeElement as HTMLInputElement).value = expressionist(
				(document.activeElement as HTMLInputElement).value,
				{
					startChar: "~",
					endChar: "~"
				}
			);
		}
	}
});
