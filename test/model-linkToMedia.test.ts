import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Link To Media field model", snapshotTwiceMacro, () =>
	model.linkToMedia(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.linkToMedia({ seed: t.title }),
);
