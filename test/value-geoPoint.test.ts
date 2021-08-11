import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock GeoPoint field value", snapshotTwiceMacro, value.geoPoint);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.geoPoint({ seed: 1 }),
);
