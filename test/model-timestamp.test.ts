import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Timestamp field model",
	snapshotTwiceMacro,
	model.timestamp,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.timestamp({ seed: 1 }),
);
