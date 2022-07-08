import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Boolean field value", snapshotTwiceMacro, (t) =>
	value.boolean({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.boolean({ seed: 1 }),
);
