import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Embed field model", snapshotTwiceMacro, (t) =>
	model.embed({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.embed({ seed: 1 }),
);
