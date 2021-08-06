import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Rich Text field model",
	executeTwiceMacro,
	model.richText,
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Inventore illum atque",
				single: "heading2",
				allowTargetBlank: true,
			},
			type: "StructuredText",
		},
		{
			config: {
				label: "Blockchains",
				multi: "list-item,heading4,heading2,o-list-item,preformatted",
				placeholder: "Modi saepe porro",
				allowTargetBlank: undefined,
			},
			type: "StructuredText",
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.richText({ seed: 1 }),
	[
		{
			config: {
				label: "Communities",
				placeholder: "Sunt qui amet",
				single: "strong,heading4,heading2,heading1,image,list-item,hyperlink",
				allowTargetBlank: undefined,
			},
			type: "StructuredText",
		},
		{
			config: {
				label: "Infomediaries",
				placeholder: "Cupiditate sed dignissimos",
				single: "heading5,hyperlink,paragraph,image,heading6,em",
				allowTargetBlank: true,
			},
			type: "StructuredText",
		},
	],
);

test(
	"can be configured to always allow multiple blocks",
	executeTwiceMacro,
	() => model.richText({ withMultipleBlocks: true }),
	[
		{
			config: {
				label: "Convergence",
				placeholder: "Ratione distinctio ipsum",
				multi: "list-item",
				allowTargetBlank: true,
			},
			type: "StructuredText",
		},
		{
			config: {
				label: "Communities",
				placeholder: "Quasi ab omnis",
				multi:
					"o-list-item,hyperlink,heading3,em,paragraph,heading6,embed,heading4,strong,list-item",
				allowTargetBlank: undefined,
			},
			type: "StructuredText",
		},
	],
);
