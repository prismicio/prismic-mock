import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Boolean field model", snapshotTwiceMacro, () =>
	model.boolean(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.boolean({ seed: t.title }),
);
