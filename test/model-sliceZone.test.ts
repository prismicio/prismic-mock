import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Slice Zone field model",
	snapshotTwiceMacro,
	model.sliceZone,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.sliceZone({ seed: 1 }),
);

test("can be configured with a specific number of choices", (t) => {
	const actual = model.sliceZone({ choicesCount: 10 });

	t.is(Object.keys(actual.config.choices).length, 10);
});

test("can be configured to use Shared Slices", (t) => {
	const actual = model.sliceZone({ withSharedSlices: true });

	t.true(
		Object.values(actual.config.choices).every(
			(choice) => choice.type === "SharedSlice",
		),
	);
});
