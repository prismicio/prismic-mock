import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Link field model", snapshotTwiceMacro, model.link);

test("supports custom seed", snapshotTwiceMacro, () => model.link({ seed: 1 }));

test("can be configured to explicitly support blank target", (t) => {
	const actualTrue = model.link({ allowTargetBlank: true });
	t.is(actualTrue.config.allowTargetBlank, true);

	const actualFalse = model.link({ allowTargetBlank: false });
	t.is(actualFalse.config.allowTargetBlank, undefined);
});
