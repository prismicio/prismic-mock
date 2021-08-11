import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock GeoPoint field model", snapshotTwiceMacro, model.geoPoint);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.geoPoint({ seed: 1 }),
);
