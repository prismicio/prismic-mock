import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Timestamp field model", snapshotTwiceMacro, (t) =>
	model.timestamp({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.timestamp({ seed: 1 }),
);
