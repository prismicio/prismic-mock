import * as prismicT from "@prismicio/types";
// import * as faker from 'faker/locale/en_US'
// import * as changeCase from "change-case";

type RichTextArgs = {
	types?: prismicT.RTNode["type"][];
	blockCount?: number;
	fieldConfig?: prismicT.CustomTypeModelRichTextField;
};

// TODO: Write this to be more flexible. Each block type should have a renderer.

export const richText = (_args: RichTextArgs = {}): prismicT.RichTextField => {
	// const types = args.types ||
	// 	(args.fieldConfig &&
	// 		("single" in args.fieldConfig.config
	// 			? args.fieldConfig.config.single.split(",")
	// 			: args.fieldConfig.config.multi.split(","))) || [
	// 		prismicT.RichTextNodeType.heading1,
	// 		prismicT.RichTextNodeType.paragraph,
	// 	];
	// const blockCount = args.blockCount ?? faker.datatype.number();

	return [];

	// return Array(blockCount)
	// 	.fill(undefined)
	// 	.map(() => {
	// 		const type = faker.random.arrayElement(types);

	// 		return {
	// 			type,
	// 		};
	// 	});
};
