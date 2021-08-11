import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Rich Text field model",
	snapshotTwiceMacro,
	model.richText,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.richText({ seed: 1 }),
);

test(
	"can be configured to always allow multiple blocks",
	snapshotTwiceMacro,
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
