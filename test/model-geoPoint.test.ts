import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock GeoPoint field model", snapshotTwiceMacro, (t) =>
	model.geoPoint({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.geoPoint({ seed: 1 }),
);
