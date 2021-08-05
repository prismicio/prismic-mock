import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";

type RichTextNodeTitleType =
	| prismicT.RichTextNodeType.heading1
	| prismicT.RichTextNodeType.heading2
	| prismicT.RichTextNodeType.heading3
	| prismicT.RichTextNodeType.heading4
	| prismicT.RichTextNodeType.heading5
	| prismicT.RichTextNodeType.heading6;

type TitleArgs = {
	types?: RichTextNodeTitleType[];
	fieldConfig?: prismicT.CustomTypeModelTitleField;
};

export const title = (args: TitleArgs = {}): prismicT.TitleField => {
	const types = args.types ||
		args.fieldConfig?.config.single.split(",") || [
			prismicT.RichTextNodeType.heading1,
		];
	const type = faker.random.arrayElement(types);

	return [
		{
			type: type as RichTextNodeTitleType,
			text: changeCase.capitalCase(faker.lorem.word(4)),
			spans: [],
		},
	];
};
