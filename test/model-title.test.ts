import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Title field model", snapshotTwiceMacro, (t) =>
	model.title({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.title({ seed: 1 }),
);
