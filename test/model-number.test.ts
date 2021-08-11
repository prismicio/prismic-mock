import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Number field model", snapshotTwiceMacro, model.number);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.number({ seed: 1 }),
);
