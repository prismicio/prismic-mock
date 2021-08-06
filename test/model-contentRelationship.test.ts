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
				customtypes: undefined,
				tags: undefined,
			},
			type: "Link",
		},
		{
			config: {
				label: "Paradigms",
				placeholder: "Illum atque voluptatibus",
				select: "document",
				customtypes: undefined,
				tags: undefined,
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
				customtypes: undefined,
				tags: undefined,
			},
			type: "Link",
		},
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
				select: "document",
				customtypes: undefined,
				tags: undefined,
			},
			type: "Link",
		},
	],
);

test("can be configured to constrain by custom type", (t) => {
	const actual = model.contentRelationship({ constrainCustomTypes: true });

	t.deepEqual(actual.config.customtypes, ["blockchains"]);
});

test("can be configured to constrain by tags", (t) => {
	const actual = model.contentRelationship({ constrainTags: true });

	t.deepEqual(actual.config.tags, [
		"Ab",
		"Dolores Ratione Distinctio",
		"Placeat",
	]);
});
