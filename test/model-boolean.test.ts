import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Boolean field model", executeTwiceMacro, model.boolean, [
	{
		config: {
			label: "Synergies",
		},
		type: "Boolean",
	},
	{
		config: {
			label: "Infrastructures",
		},
		type: "Boolean",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.boolean({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
			},
			type: "Boolean",
		},
		{
			config: {
				label: "Blockchains",
			},
			type: "Boolean",
		},
	],
);
