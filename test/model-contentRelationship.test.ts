import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Content Relationship field model",
	snapshotTwiceMacro,
	model.contentRelationship,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.contentRelationship({ seed: 1 }),
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
