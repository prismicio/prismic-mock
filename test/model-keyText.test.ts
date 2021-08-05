import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Key Text field model", executeTwiceMacro, model.keyText, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
		},
		type: "Text",
	},
	{
		config: {
			label: "Paradigms",
			placeholder: "Illum atque voluptatibus",
		},
		type: "Text",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.keyText({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
			},
			type: "Text",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
			},
			type: "Text",
		},
	],
);
