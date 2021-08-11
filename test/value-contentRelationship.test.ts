import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock Content Relationship field value",
	snapshotTwiceMacro,
	value.contentRelationship,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.contentRelationship({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.contentRelationship({
		constrainCustomTypes: true,
		constrainTags: true,
	});

	const actual = value.contentRelationship({
		model: customModel,
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config.customtypes!.includes(actual.type));

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(actual.tags.every((tag) => customModel.config.tags!.includes(tag)));
});

test("can be configured to return an unfilled value", (t) => {
	const actual = value.contentRelationship({ isFilled: false });

	t.false("url" in actual);
});
