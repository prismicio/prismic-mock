import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Date field model", executeTwiceMacro, model.date, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
		},
		type: "Date",
	},
	{
		config: {
			label: "Paradigms",
			placeholder: "Illum atque voluptatibus",
		},
		type: "Date",
	},
]);

test("supports custom seed", executeTwiceMacro, () => model.date({ seed: 1 }), [
	{
		config: {
			label: "Technologies",
			placeholder: "Repellat quisquam recusandae",
		},
		type: "Date",
	},
	{
		config: {
			label: "Synergies",
			placeholder: "Consequuntur corporis repellat",
		},
		type: "Date",
	},
]);
