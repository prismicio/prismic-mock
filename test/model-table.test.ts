import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Table field model", snapshotTwiceMacro, (t) =>
	model.table({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.table({ seed: 1 }),
);
