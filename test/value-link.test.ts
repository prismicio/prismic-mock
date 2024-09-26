import test from "ava";
import * as prismic from "@prismicio/client";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Link field value", snapshotTwiceMacro, (t) =>
	value.link({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () => value.link({ seed: 1 }));

test("supports custom model", (t) => {
	const customModelBase = model.link({ seed: t.title });
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			allowTargetBlank: true as const,
			allowText: true as const,
		},
	};

	const actual = value.link({
		// This specific seed ensures `target` will be "_blank".
		seed: 10000,
		model: customModel,
		type: prismic.LinkType.Web,
	});

	t.is(actual.target, "_blank");
	t.is(typeof actual.text, "string");
});

test("can be configured to return an empty link value", (t) => {
	const actual = value.link({
		seed: t.title,
		type: prismic.LinkType.Web,
		state: "empty",
	});

	t.false("url" in actual);
});

test("can be configured to return a value with `_blank` target", (t) => {
	const actualTrue = value.link({
		seed: t.title,
		type: prismic.LinkType.Web,
		withTargetBlank: true,
	});
	t.is(actualTrue.target, "_blank");

	const actualFalse = value.link({
		seed: t.title,
		type: prismic.LinkType.Web,
		withTargetBlank: false,
	});
	t.is(actualFalse.target, undefined);
});

test("can be configured to return a value with display text", (t) => {
	const actualTrue = value.link({
		seed: t.title,
		type: prismic.LinkType.Web,
		withText: true,
	});
	t.is(typeof actualTrue.text, "string");

	const actualFalse = value.link({
		seed: t.title,
		type: prismic.LinkType.Web,
		withText: false,
	});
	t.is(actualFalse.text, undefined);
});
