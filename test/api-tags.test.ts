import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock tags value", snapshotTwiceMacro, (t) =>
	mock.api.tags({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	mock.api.tags({ seed: 1 }),
);
