import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Color field model", snapshotTwiceMacro, (t) =>
	model.color({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.color({ seed: 1 }),
);
