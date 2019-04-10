export function isTextBox(element: Element): boolean {
	const tagName = element.tagName.toLowerCase();

	if (tagName === "textarea") {
		return true;
	}

	if (tagName !== "input") {
		return false;
	}

	const attributeElement = element.getAttribute("type");

	if (attributeElement === null) {
		return false;
	}

	const type = attributeElement.toLowerCase();
	const inputTypes = [
		"text",
		"password",
		"number",
		"email",
		"tel",
		"url",
		"search",
		"date",
		"datetime",
		"datetime-local",
		"time",
		"month",
		"week"
	];

	return inputTypes.indexOf(type) >= 0 && !(element as any).value;
}
