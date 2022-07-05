import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Key Text field model", snapshotTwiceMacro, (t) =>
	model.keyText({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.keyText({ seed: 1 }),
);
