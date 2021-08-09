import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Title field value", executeTwiceMacro, value.title, [
	[
		{
			type: "heading1",
			text: "Autem Consequuntur",
			spans: [],
		},
	],
	[
		{
			type: "heading4",
			text: "Ratione Distinctio Ipsum Placeat Et Cumque Mollitia Aliquam Soluta",
			spans: [],
		},
	],
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.title({ seed: 1 }),
	[
		[
			{
				type: "heading5",
				text: "Amet Iure",
				spans: [],
			},
		],
		[
			{
				type: "heading2",
				text: "Debitis Incidunt",
				spans: [],
			},
		],
	],
);

test("supports custom model", (t) => {
	const customModelBase = model.title();
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			single: "heading3",
		},
	};

	const actual = value.title({ model: customModel });

	t.is(actual[0].type, customModel.config.single);
});

test("can be customized with a pattern to determine title length", (t) => {
	const actualShort = value.title({
		pattern: "short",
	});
	const actualShortWordCount = actualShort[0].text.split(" ").length;
	t.true(actualShortWordCount >= 1);
	t.true(actualShortWordCount <= 3);

	const actualMedium = value.title({
		pattern: "medium",
	});
	const actualMediumWordCount = actualMedium[0].text.split(" ").length;
	t.true(actualMediumWordCount >= 3);
	t.true(actualMediumWordCount <= 6);

	const actualLong = value.title({
		pattern: "long",
	});
	const actualLongWordCount = actualLong[0].text.split(" ").length;
	t.true(actualLongWordCount >= 6);
	t.true(actualLongWordCount <= 12);
});
