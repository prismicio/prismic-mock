import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Content Relationship field model",
	executeTwiceMacro,
	model.contentRelationship,
	[
		{
			config: {
				label: "Synergies",
				placeholder: "Sed ullam voluptate",
				select: "document",
			},
			type: "Link",
		},
		{
			config: {
				label: "Paradigms",
				placeholder: "Illum atque voluptatibus",
				select: "document",
			},
			type: "Link",
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.contentRelationship({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
				placeholder: "Repellat quisquam recusandae",
				select: "document",
			},
			type: "Link",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
				select: "document",
			},
			type: "Link",
		},
	],
);
