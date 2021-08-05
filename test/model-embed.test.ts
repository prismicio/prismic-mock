import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Embed field model", executeTwiceMacro, model.embed, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
		},
		type: "Embed",
	},
	{
		config: {
			label: "Paradigms",
			placeholder: "Illum atque voluptatibus",
		},
		type: "Embed",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.embed({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
			},
			type: "Embed",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
			},
			type: "Embed",
		},
	],
);
