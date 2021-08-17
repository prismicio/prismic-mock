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

test("can be configured to return a link from a given list of documents", (t) => {
	const linkableDocuments = [value.document(), value.document()];
	const actual = value.contentRelationship({ linkableDocuments });

	t.true(
		linkableDocuments.some(
			(linkableDocument) => actual.id === linkableDocument.id,
		),
	);
});

test("can be configured to return a link from a given list of documents with constraints", (t) => {
	const linkableDocuments = [
		{ ...value.document(), type: "foo", tags: ["bar"] },
		value.document(),
	];

	const customModel = model.contentRelationship();
	customModel.config.customtypes = ["foo"];
	customModel.config.tags = ["bar"];

	const actual = value.contentRelationship({
		model: customModel,
		linkableDocuments,
	});

	t.is(actual.id, linkableDocuments[0].id);
});

test("throws if a linkable document cannot be found within constraints", (t) => {
	const linkableDocuments = [
		{ ...value.document(), type: "not-foo", tags: ["not-bar"] },
	];

	const customModel = model.contentRelationship();
	customModel.config.customtypes = ["foo"];
	customModel.config.tags = ["bar"];

	t.throws(
		() =>
			value.contentRelationship({
				model: customModel,
				linkableDocuments,
			}),
		{ message: /could not be found/ },
	);
});
