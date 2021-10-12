import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Number field value", snapshotTwiceMacro, () =>
	value.number(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.number({ seed: t.title }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.number({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});
