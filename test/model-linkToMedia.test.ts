import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Link To Media field model", snapshotTwiceMacro, (t) =>
	model.linkToMedia({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.linkToMedia({ seed: 1 }),
);

test("can be configured to explicitly support the text property", (t) => {
	const actualTrue = model.linkToMedia({
		seed: t.title,
		withText: true,
	});
	t.is(actualTrue.config.text.type, "Text");

	const actualFalse = model.linkToMedia({
		seed: t.title,
		withText: false,
	});
	t.is(actualFalse.config.text, undefined);
});
