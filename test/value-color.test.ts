import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Color field value", snapshotTwiceMacro, value.color);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.color({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.color({ state: true });

	t.is(actual, null);
});
