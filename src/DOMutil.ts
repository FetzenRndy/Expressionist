export function isTextBox(element: Element): boolean {
	return (
		element instanceof HTMLInputElement &&
		typeof (element as HTMLInputElement).value !== "undefined"
	);
}
