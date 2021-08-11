import test from "ava";
import * as prismicT from "@prismicio/types";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Link field value", snapshotTwiceMacro, value.link);

test("supports custom seed", snapshotTwiceMacro, () => value.link({ seed: 1 }));

test("supports custom model", (t) => {
	const customModelBase = model.link();
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			allowTargetBlank: true as const,
		},
	};

	const actual = value.link({
		// This specific seed ensures `target` will be "_blank".
		seed: 1,
		model: customModel,
		type: prismicT.LinkType.Web,
	});

	t.is(actual.target, "_blank");
});

test("can be configured to return an unfilled link value", (t) => {
	const actual = value.link({
		type: prismicT.LinkType.Web,
		isFilled: false,
	});

	t.false("url" in actual);
});

test("can be configured to return a value with `_blank` target", (t) => {
	const actualTrue = value.link({
		type: prismicT.LinkType.Web,
		withTargetBlank: true,
	});
	t.is(actualTrue.target, "_blank");

	const actualFalse = value.link({
		type: prismicT.LinkType.Web,
		withTargetBlank: false,
	});
	t.is(actualFalse.target, undefined);
});
