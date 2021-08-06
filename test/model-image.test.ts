import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Image field model", executeTwiceMacro, model.image, [
	{
		config: {
			label: "Infrastructures",
			constraint: {
				width: null,
				height: null,
			},
			thumbnails: [],
		},
		type: "Image",
	},
	{
		config: {
			label: "Technologies",
			constraint: {
				width: null,
				height: null,
			},
			thumbnails: [
				{
					name: "Paradigms",
					width: 1726,
					height: 1224,
				},
			],
		},
		type: "Image",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.image({ seed: 1 }),
	[
		{
			config: {
				label: "Blockchains",
				constraint: {
					width: null,
					height: null,
				},
				thumbnails: [
					{
						name: "Mindshare",
						width: 1899,
						height: 500,
					},
				],
			},
			type: "Image",
		},
		{
			config: {
				label: "E Tailers",
				constraint: {
					width: null,
					height: null,
				},
				thumbnails: [],
			},
			type: "Image",
		},
	],
);

test("can be configured to include constraints", (t) => {
	const actual = model.image({ withConstraint: true });

	t.is(typeof actual.config.constraint.width, "number");
	t.is(typeof actual.config.constraint.height, "number");
});

test("can be configured for a specific number of thumbnails", (t) => {
	const actual = model.image({ thumbnailsCount: 1 });

	t.is(actual.config.thumbnails.length, 1);
});
