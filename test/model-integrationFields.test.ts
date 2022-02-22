import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Integration Fields field model", snapshotTwiceMacro, () =>
	model.integrationFields(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.integrationFields({ seed: t.title }),
);
