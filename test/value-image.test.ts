import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Image field value", snapshotTwiceMacro, () =>
	value.image(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.image({ seed: t.title }),
);

test("can be configured to return an empty value", (t) => {
	const customModel = model.image({ seed: t.title });
	customModel.config.thumbnails = [
		{
			name: "Foo",
			height: null,
			width: null,
		},
	];

	const actual = value.image({
		seed: t.title,
		model: customModel,
		state: "empty",
	});

	t.deepEqual(
		actual,
		// TODO: Resolve the following type error
		// @ts-expect-error - Unsure how to fix this type mismatch
		{
			url: null,
			alt: null,
			copyright: null,
			dimensions: null,
			Foo: {
				url: null,
				alt: null,
				copyright: null,
				dimensions: null,
			},
		},
	);
});

test("supports custom model", (t) => {
	const customModel = model.image({
		seed: t.title,
		withConstraint: true,
		thumbnailNames: ["Foo"],
	});

	const actual = value.image({
		seed: t.title,
		model: customModel,
	});

	t.is(actual.dimensions.width, customModel.config.constraint.width);
	t.is(actual.dimensions.height, customModel.config.constraint.height);
	t.true("Foo" in actual);
});
