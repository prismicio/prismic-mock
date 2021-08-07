import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock Content Relationship field value",
	executeTwiceMacro,
	value.contentRelationship,
	[
		{
			link_type: "Document",
			id: "4fbf3eb",
			uid: undefined,
			type: "paradigms",
			tags: ["Voluptatibus Veniam", "Autem Consequuntur"],
			lang: "ab",
			url: "#",
			slug: "dolores_ratione_distinctio",
			isBroken: false,
		},
		{
			link_type: "Document",
			id: "f310c1c",
			uid: "consectetur_quibusdam",
			type: "roi",
			tags: ["Dolorum Qui", "Autem"],
			lang: "consectetur",
			url: "#",
			slug: "qui_amet",
			isBroken: false,
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.contentRelationship({ seed: 1 }),
	[
		{
			link_type: "Document",
			id: "4f23162",
			uid: undefined,
			type: "synergies",
			tags: [],
			lang: "ut",
			url: "#",
			slug: "qui_recusandae_ut",
			isBroken: true,
		},
		{
			link_type: "Document",
			id: "ae67862",
			uid: "velit_omnis",
			type: "eyeballs",
			tags: ["Incidunt Accusantium Sed"],
			lang: "et",
			url: "#",
			slug: "ut_et_ipsam",
			isBroken: false,
		},
	],
);

test("supports custom model", (t) => {
	const customModel = model.contentRelationship({
		constrainCustomTypes: true,
		constrainTags: true,
	});

	const actual = value.contentRelationship({
		model: customModel,
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config.customtypes!.includes(actual.type));

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(actual.tags.every((tag) => customModel.config.tags!.includes(tag)));
});
