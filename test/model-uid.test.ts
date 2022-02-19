import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock UID field model", snapshotTwiceMacro, () => model.uid());

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.uid({ seed: t.title }),
);
