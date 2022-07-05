import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Title field value", snapshotTwiceMacro, (t) =>
	value.title({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.title({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModelBase = model.title({ seed: t.title });
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			single: "heading3" as const,
		},
	};

	const actual = value.title({
		seed: t.title,
		model: customModel,
	});

	t.is(actual[0].type, customModel.config.single);
});

test("can be customized with a pattern to determine title length", (t) => {
	const actualShort = value.title({
		seed: t.title,
		pattern: "short",
	});
	const actualShortWordCount = actualShort[0].text.split(" ").length;
	t.true(actualShortWordCount >= 1);
	t.true(actualShortWordCount <= 3);

	const actualMedium = value.title({
		seed: t.title,
		pattern: "medium",
	});
	const actualMediumWordCount = actualMedium[0].text.split(" ").length;
	t.true(actualMediumWordCount >= 3);
	t.true(actualMediumWordCount <= 6);

	const actualLong = value.title({
		seed: t.title,
		pattern: "long",
	});
	const actualLongWordCount = actualLong[0].text.split(" ").length;
	t.true(actualLongWordCount >= 6);
	t.true(actualLongWordCount <= 12);
});
