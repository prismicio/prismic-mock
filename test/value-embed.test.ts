import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Embed field value", snapshotTwiceMacro, (t) =>
	value.embed({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.embed({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.embed({
		seed: t.title,
		state: "empty",
	});

	t.deepEqual(actual, {});
});
