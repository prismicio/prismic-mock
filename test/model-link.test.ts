import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Link field model", snapshotTwiceMacro, (t) =>
	model.link({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () => model.link({ seed: 1 }));

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

test("can be configured to explicitly support the text property", (t) => {
	const actualTrue = model.link({
		seed: t.title,
		allowText: true,
	});
	t.is(actualTrue.config.allowText, true);

	const actualFalse = model.link({
		seed: t.title,
		allowText: false,
	});
	t.is(actualFalse.config.allowText, undefined);
});

test("can be configured to be repeatable", (t) => {
	const actualTrue = model.link({
		seed: t.title,
		repeat: true,
	});
	t.is(actualTrue.config.repeat, true);

	const actualFalse = model.link({
		seed: t.title,
		repeat: false,
	});
	t.is(actualFalse.config.repeat, undefined);
});
