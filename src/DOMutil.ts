export function isTextBox(element: Element): boolean {
	return typeof (element as any).value !== "undefined";
}
