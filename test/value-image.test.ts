import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Image field value", snapshotTwiceMacro, value.image);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.image({ seed: 1 }),
);

test("supports custom model", (t) => {
	t.plan(4);

	const customModel = model.image({
		withConstraint: true,
		thumbnailsCount: 2,
	});

	const actual = value.image({
		model: customModel,
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.is(actual.dimensions!.width, customModel.config.constraint.width);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.is(actual.dimensions!.height, customModel.config.constraint.height);

	for (const thumbnailConfig of customModel.config.thumbnails) {
		t.true(thumbnailConfig.name in actual);
	}
});
