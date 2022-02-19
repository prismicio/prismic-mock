import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Embed field model", snapshotTwiceMacro, () =>
	model.embed(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.embed({ seed: t.title }),
);
