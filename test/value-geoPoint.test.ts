import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock GeoPoint field value", snapshotTwiceMacro, (t) =>
	value.geoPoint({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.geoPoint({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.geoPoint({
		seed: t.title,
		state: "empty",
	});

	t.deepEqual(actual, {});
});
