import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock RichText field value", executeTwiceMacro, value.richText, [
	[
		{ type: "heading2", text: "Repellat", spans: [] },
		{ type: "heading2", text: "Porro Voluptatem Ab", spans: [] },
		{ type: "heading2", text: "Ipsum Placeat", spans: [] },
		{ type: "heading2", text: "Soluta Unde Dolorum Qui", spans: [] },
		{
			type: "heading2",
			text: "Quasi Ab Omnis Fugit Omnis Asperiores Consectetur",
			spans: [],
		},
	],
	[
		{
			type: "paragraph",
			text: "Dicta et voluptatem. Quia assumenda maxime.",
			spans: [],
		},
		{
			type: "heading1",
			text: "Excepturi Praesentium Blanditiis Reprehenderit Voluptatem Ut Doloribus",
			spans: [],
		},
	],
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.richText({ seed: 1 }),
	[
		[
			{
				type: "image",
				alt: "Ut nulla quam ipsam nobis cupiditate sed dignissimos debitis incidunt.",
				url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=2560&h=1440&fit=crop",
				copyright: "Sed libero repudiandae.",
				dimensions: { width: 2560, height: 1440 },
			},
			{ type: "heading2", text: "Eos Itaque Velit Omnis", spans: [] },
			{
				type: "list-item",
				text: "Ipsam explicabo eligendi occaecati debitis et saepe eum dicta.",
				spans: [],
			},
		],
		[
			{
				type: "heading2",
				text: "Consequuntur Aut Est Fuga Est",
				spans: [],
			},
			{
				type: "image",
				alt: "Voluptas enim ex eveniet facere.",
				url: "https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?w=4240&h=2832&fit=crop",
				copyright: "Aut delectus aut nam et dolorum.",
				dimensions: { width: 4240, height: 2832 },
			},
			{
				type: "heading3",
				text: "Veritatis Qui Ex Culpa Earum Voluptate Vel Labore Omnis Ut Est Sunt",
				spans: [],
			},
		],
	],
);

test("supports custom model", (t) => {
	const customModel = model.richText({ withMultipleBlocks: false });
	customModel.config.single = "paragraph";

	const actual = value.richText({ model: customModel });

	t.is(actual[0].type, customModel.config.single);
});

test("models without multiple blocks returns one block", (t) => {
	const customModel = model.richText({ withMultipleBlocks: false });
	customModel.config.single = "paragraph";

	const actual = value.richText({ model: customModel });

	t.is(actual.length, 1);
});

test("can be customized with a pattern to determine richText length", (t) => {
	const customModel = model.richText({ withMultipleBlocks: true });

	const actualShort = value.richText({
		pattern: "short",
		model: customModel,
	});
	t.true(actualShort.length >= 1);
	t.true(actualShort.length <= 2);

	const actualMedium = value.richText({
		pattern: "medium",
		model: customModel,
	});
	t.true(actualMedium.length >= 2);
	t.true(actualMedium.length <= 4);

	const actualLong = value.richText({
		pattern: "long",
		model: customModel,
	});
	t.true(actualLong.length >= 4);
	t.true(actualLong.length <= 8);
});
