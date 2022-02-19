import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Color field model", snapshotTwiceMacro, () =>
	model.color(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.color({ seed: t.title }),
);
