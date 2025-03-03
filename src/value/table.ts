import * as prismic from "@prismicio/client";

import { createFaker, Faker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";
import { richText } from "./richText";

export type MockTableValueConfig<
	Model extends
		prismic.CustomTypeModelTableField = prismic.CustomTypeModelTableField,
	State extends prismic.FieldState = prismic.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockTableValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.TableField<State>;

export const table = <
	Model extends
		prismic.CustomTypeModelTableField = prismic.CustomTypeModelTableField,
	State extends prismic.FieldState = "filled",
>(
	config: MockTableValueConfig<Model, State>,
): MockTableValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	const cells = faker.range(1, 10);
	const bodyRows = faker.range(1, 10);

	return (
		config.state === "empty"
			? null
			: {
					head: {
						rows: [
							{
								cells: Array.from({ length: cells }, () =>
									mockTableCell({
										type: "header",
										faker,
									}),
								),
							},
						],
					},
					body: {
						rows: Array.from({ length: bodyRows }, () => ({
							cells: Array.from({ length: cells }, () =>
								mockTableCell({
									type: "data",
									faker,
								}),
							),
						})),
					},
				}
	) as MockTableValue<State>;
};

// Only exported for testing purposes, to ensure the model used is in sync with the internal one.
export const TableCell = {
	type: "StructuredText",
	config: {
		multi: [
			prismic.RichTextNodeType.paragraph,
			prismic.RichTextNodeType.strong,
			prismic.RichTextNodeType.em,
			prismic.RichTextNodeType.hyperlink,
		].join(","),
	},
} as const;

const mockTableCell = ({
	type,
	faker,
}: {
	type: "header" | "data";
	faker: Faker;
}) => ({
	type,
	content: richText({
		faker,
		model: TableCell,
	}),
});
