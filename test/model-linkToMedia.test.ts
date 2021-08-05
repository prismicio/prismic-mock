import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Link To Media field model",
	executeTwiceMacro,
	model.linkToMedia,
	[
		{
			config: {
				label: "Synergies",
				placeholder: "Sed ullam voluptate",
				select: "media",
			},
			type: "Link",
		},
		{
			config: {
				label: "Paradigms",
				placeholder: "Illum atque voluptatibus",
				select: "media",
			},
			type: "Link",
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.linkToMedia({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
				select: "media",
			},
			type: "Link",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
				select: "media",
			},
			type: "Link",
		},
	],
);
