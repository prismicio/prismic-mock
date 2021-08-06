import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Title field model", executeTwiceMacro, model.title, [
	{
		config: {
			label: "E Tailers",
			placeholder: "Voluptate inventore illum",
			single: "heading1",
			allowTargetBlank: undefined,
		},
		type: "StructuredText",
	},
	{
		config: {
			label: "Deliverables",
			placeholder: "Repellat modi saepe",
			single: "heading6,heading5,heading1,heading4,heading3,heading2",
			allowTargetBlank: true,
		},
		type: "StructuredText",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.title({ seed: 1 }),
	[
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
				single: "heading5,heading4,heading6",
				allowTargetBlank: undefined,
			},
			type: "StructuredText",
		},
		{
			config: {
				label: "Channels",
				placeholder: "Iure ut libero",
				single: "heading2,heading1",
				allowTargetBlank: undefined,
			},
			type: "StructuredText",
		},
	],
);
