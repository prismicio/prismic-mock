import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Slice Zone field model", snapshotTwiceMacro, () =>
	model.sliceZone(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.sliceZone({ seed: t.title }),
);

test("can be configured to use specific choices", (t) => {
	const choices = {
		foo: model.slice({ seed: t.title }),
		bar: model.slice({ seed: t.title }),
	};

	const actual = model.sliceZone({
		seed: t.title,
		choices,
	});

	t.deepEqual(actual.config.choices, choices);
});
