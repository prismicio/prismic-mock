export const capitalCase = (input: string) =>
	stripPunctuation(input).replace(/(^\w|\s\w)/g, (char) => char.toUpperCase());

export const snakeCase = (input: string) =>
	stripPunctuation(input).toLowerCase().replace(/\s/g, "_");

export const sentenceCase = (input: string) =>
	stripPunctuation(input).replace(/^./, (char) => char.toUpperCase());

export const pascalCase = (input: string) =>
	capitalCase(stripPunctuation(input.replace(/-|_/, " "))).replace(/ /g, "");

const stripPunctuation = (input: string) =>
	input.replace(/[^\p{L}\p{N}\s]/gu, "");
