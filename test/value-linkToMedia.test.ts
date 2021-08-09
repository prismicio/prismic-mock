import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Link To Media field value",
	executeTwiceMacro,
	value.linkToMedia,
	[
		{
			link_type: "Media",
			name: "plastic.pdf",
			kind: "image",
			url: "#",
			size: "98246",
			height: "28184",
			width: "51081",
		},
		{
			link_type: "Media",
			name: "plastic_matrix_international.pdf",
			kind: "image",
			url: "#",
			size: "14629",
			height: "66250",
			width: "17234",
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.linkToMedia({ seed: 1 }),
	[
		{
			link_type: "Media",
			name: "producer_music.html",
			kind: "audio",
			url: "#",
			size: "9233",
			height: "39658",
			width: "18626",
		},
		{
			link_type: "Media",
			name: "open_source_operations.png",
			kind: "text",
			url: "#",
			size: "52454",
			height: "20445",
			width: "44345",
		},
	],
);

test("can be configured to return an unfilled value", (t) => {
	const actual = value.linkToMedia({ isFilled: false });

	t.false("url" in actual);
});
