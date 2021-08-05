import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";
import { executeOnceMacro } from "./__testutils__/executeOnceMacro";

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

test(
	"can be configured to include constraints",
	executeOnceMacro,
	() => model.image({ withConstraint: true }),
	[
		{
			config: {
				label: "Solutions",
				constraint: {
					width: 1266,
					height: 1692,
				},
				thumbnails: [
					{
						name: "Infrastructures",
						width: 938,
						height: 1997,
					},
					{
						name: "Deliverables",
						width: 1999,
						height: 832,
					},
					{
						name: "Functionalities",
						width: 1575,
						height: 892,
					},
				],
			},
			type: "Image",
		},
	],
);

test(
	"can be configured for a specific number of thumbnails",
	executeOnceMacro,
	() => model.image({ thumbnailsCount: 1 }),
	[
		{
			config: {
				label: "Paradigms",
				constraint: {
					width: null,
					height: null,
				},
				thumbnails: [
					{
						name: "Mindshare",
						width: 1243,
						height: 719,
					},
				],
			},
			type: "Image",
		},
	],
);
