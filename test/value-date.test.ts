import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Date field value", snapshotTwiceMacro, value.date);

test("supports custom seed", snapshotTwiceMacro, () => value.date({ seed: 1 }));

test("can be configured to return a date after and before given dates", (t) => {
	const actual = value.date({
		after: new Date(1984, 0, 1),
		before: new Date(1984, 0, 3),
	});

	t.is(actual, "1984-01-02");
});
