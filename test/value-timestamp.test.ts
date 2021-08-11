import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Timestamp field value",
	snapshotTwiceMacro,
	value.timestamp,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.timestamp({ seed: 1 }),
);

test("can be configured to return a timestamp after and before given timestamps", (t) => {
	const actual = value.timestamp({
		after: new Date(1984, 0, 1),
		before: new Date(1984, 0, 3),
	});

	t.is(actual, "1984-01-02T09:10:08.299Z");
});
