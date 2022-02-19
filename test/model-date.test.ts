import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Date field model", snapshotTwiceMacro, () => model.date());

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.date({ seed: t.title }),
);
