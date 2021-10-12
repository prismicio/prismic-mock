import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Link field model", snapshotTwiceMacro, () => model.link());

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.link({ seed: t.title }),
);

test("can be configured to explicitly support blank target", (t) => {
	const actualTrue = model.link({
		seed: t.title,
		allowTargetBlank: true,
	});
	t.is(actualTrue.config.allowTargetBlank, true);

	const actualFalse = model.link({
		seed: t.title,
		allowTargetBlank: false,
	});
	t.is(actualFalse.config.allowTargetBlank, undefined);
});
