export function isTextBox(element: Element): boolean {
	return (
		element instanceof HTMLInputElement &&
		element.isContentEditable &&
		typeof (element as HTMLInputElement).value !== "undefined"
	);
}
