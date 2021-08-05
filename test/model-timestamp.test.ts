import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Timestamp field model",
	executeTwiceMacro,
	model.timestamp,
	[
		{
			config: {
				label: "Synergies",
				placeholder: "Sed ullam voluptate",
			},
			type: "Timestamp",
		},
		{
			config: {
				label: "Paradigms",
				placeholder: "Illum atque voluptatibus",
			},
			type: "Timestamp",
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.timestamp({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
			},
			type: "Timestamp",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
			},
			type: "Timestamp",
		},
	],
);
