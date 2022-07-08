import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Image field model", snapshotTwiceMacro, (t) =>
	model.image({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.image({ seed: 1 }),
);

test("can be configured to include constraints", (t) => {
	const actual = model.image({
		seed: t.title,
		withConstraint: true,
	});

	t.is(typeof actual.config.constraint.width, "number");
	t.is(typeof actual.config.constraint.height, "number");
});

test("can be configured for a specific thumbnails", (t) => {
	const actual = model.image({
		seed: t.title,
		thumbnailNames: ["Foo"],
	});

	t.is(actual.config.thumbnails.length, 1);
	t.is(actual.config.thumbnails[0].name, "Foo");
});
