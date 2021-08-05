import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock UID field model", executeTwiceMacro, model.uid, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
		},
		type: "UID",
	},
	{
		config: {
			label: "Paradigms",
			placeholder: "Illum atque voluptatibus",
		},
		type: "UID",
	},
]);

test("supports custom seed", executeTwiceMacro, () => model.uid({ seed: 1 }), [
	{
		config: {
			label: "Technologies",
			placeholder: "Repellat quisquam recusandae",
		},
		type: "UID",
	},
	{
		config: {
			label: "Synergies",
			placeholder: "Consequuntur corporis repellat",
		},
		type: "UID",
	},
]);
