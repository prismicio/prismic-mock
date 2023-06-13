import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock RichText field value", snapshotTwiceMacro, (t) =>
	value.richText({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.richText({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.richText({
		seed: t.title,
		withMultipleBlocks: false,
	});
	if (customModel.config) {
		customModel.config.single = "paragraph";
	}

	const actual = value.richText({
		seed: t.title,
		model: customModel,
	});

	t.is(
		actual[0]?.type,
		customModel.config?.single as (typeof actual)[number]["type"],
	);
});

test("models without multiple blocks returns one block", (t) => {
	const customModel = model.richText({
		seed: t.title,
		withMultipleBlocks: false,
	});
	if (customModel.config) {
		customModel.config.single = "paragraph";
	}

	const actual = value.richText({
		seed: t.title,
		model: customModel,
	});

	t.is(actual.length, 1);
});

test("can be customized with a pattern to determine richText length", (t) => {
	const customModel = model.richText({
		seed: t.title,
		withMultipleBlocks: true,
	});

	const actualShort = value.richText({
		seed: t.title,
		pattern: "short",
		model: customModel,
	});
	t.true(actualShort.length >= 1);
	t.true(actualShort.length <= 2);

	const actualMedium = value.richText({
		seed: t.title,
		pattern: "medium",
		model: customModel,
	});
	t.true(actualMedium.length >= 2);
	t.true(actualMedium.length <= 4);

	const actualLong = value.richText({
		seed: t.title,
		pattern: "long",
		model: customModel,
	});
	t.true(actualLong.length >= 4);
	t.true(actualLong.length <= 8);
});
