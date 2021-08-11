import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Image field model", snapshotTwiceMacro, model.image);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.image({ seed: 1 }),
);

test("can be configured to include constraints", (t) => {
	const actual = model.image({ withConstraint: true });

	t.is(typeof actual.config.constraint.width, "number");
	t.is(typeof actual.config.constraint.height, "number");
});

test("can be configured for a specific number of thumbnails", (t) => {
	const actual = model.image({ thumbnailsCount: 1 });

	t.is(actual.config.thumbnails.length, 1);
});
