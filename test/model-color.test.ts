import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Color field model", executeTwiceMacro, model.color, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
		},
		type: "Color",
	},
	{
		config: {
			label: "Paradigms",
			placeholder: "Illum atque voluptatibus",
		},
		type: "Color",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.color({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
			},
			type: "Color",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
			},
			type: "Color",
		},
	],
);
