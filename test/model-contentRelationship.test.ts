import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Content Relationship field model",
	snapshotTwiceMacro,
	() => model.contentRelationship(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.contentRelationship({ seed: t.title }),
);

test("can be configured to constrain by custom type", (t) => {
	const actual = model.contentRelationship({
		seed: t.title,
		constrainCustomTypes: true,
	});

	t.deepEqual(actual.config.customtypes, ["technologies"]);
});

test("can be configured to constrain by tags", (t) => {
	const actual = model.contentRelationship({
		seed: t.title,
		constrainTags: true,
	});

	t.deepEqual(actual.config.tags, [
		"Iure Molestias Consectetur",
		"Asperiores",
		"Quidem Cum Veritatis",
	]);
});
