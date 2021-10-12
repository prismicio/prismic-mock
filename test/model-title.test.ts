import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Title field model", snapshotTwiceMacro, () =>
	model.title(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.title({ seed: t.title }),
);
