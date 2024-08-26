import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Content Relationship field model",
	snapshotTwiceMacro,
	(t) => model.contentRelationship({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.contentRelationship({ seed: 1 }),
);

test("can be configured to constrain by custom type", (t) => {
	const customTypeIDs = ["foo", "bar"];
	const actual = model.contentRelationship({
		seed: t.title,
		customTypeIDs,
	});

	t.is(actual.config?.customtypes, customTypeIDs);
});

test("can be configured to constrain by tags", (t) => {
	const tags = ["foo", "bar"];
	const actual = model.contentRelationship({
		seed: t.title,
		tags,
	});

	t.is(actual.config?.tags, tags);
});

test("can be configured to explicitly support the text property", (t) => {
	const actualTrue = model.contentRelationship({
		seed: t.title,
		text: true,
	});
	t.is(actualTrue.config?.text?.type, "Text");

	const actualFalse = model.contentRelationship({
		seed: t.title,
		text: false,
	});
	t.is(actualFalse.config.text, undefined);
});
