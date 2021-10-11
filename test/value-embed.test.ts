import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Embed field value", snapshotTwiceMacro, value.embed);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.embed({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.embed({ state: true });

	t.deepEqual(actual, {});
});
