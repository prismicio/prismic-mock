import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock UID field model", snapshotTwiceMacro, (t) =>
	model.uid({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () => model.uid({ seed: 1 }));
