import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Number field model", executeTwiceMacro, model.number, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
		},
		type: "Number",
	},
	{
		config: {
			label: "Paradigms",
			placeholder: "Illum atque voluptatibus",
		},
		type: "Number",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.number({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
			},
			type: "Number",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
			},
			type: "Number",
		},
	],
);
