import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock Content Relationship field value",
	snapshotTwiceMacro,
	(t) => value.contentRelationship({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.contentRelationship({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.contentRelationship({
		seed: t.title,
		customTypeIDs: ["type"],
		tags: ["tag"],
		text: true,
	});

	const actual = value.contentRelationship({
		seed: t.title,
		model: customModel,
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config?.customtypes!.includes(actual.type));

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config?.tags!.every((tag) => actual.tags.includes(tag)));
	t.is(actual.text, "Aliquam etiam");
});

test("can be configured to return an empty value", (t) => {
	const actual = value.contentRelationship({
		seed: t.title,
		state: "empty",
	});

	t.false("url" in actual);
});

test("can be configured to return a link from a given list of documents", (t) => {
	const linkableDocuments = [
		value.document({ seed: t.title }),
		value.document({ seed: t.title }),
	];
	const actual = value.contentRelationship({
		seed: t.title,
		linkableDocuments,
	});

	t.true(
		linkableDocuments.some(
			(linkableDocument) => actual.id === linkableDocument.id,
		),
	);
});

test("can be configured to return a link from a given list of documents with constraints", (t) => {
	const linkableDocuments = [
		{ ...value.document({ seed: t.title }), type: "foo", tags: ["bar"] },
		value.document({ seed: t.title }),
	];

	const customModel = model.contentRelationship({ seed: t.title });
	if (customModel.config) {
		customModel.config.customtypes = ["foo"];
		customModel.config.tags = ["bar"];
	}

	const actual = value.contentRelationship({
		seed: t.title,
		model: customModel,
		linkableDocuments,
	});

	t.is(actual.id, linkableDocuments[0].id);
});

test("throws if a linkable document cannot be found within constraints", (t) => {
	const linkableDocuments = [
		{
			...value.document({ seed: t.title }),
			type: "not-foo",
			tags: ["not-bar"],
		},
	];

	const customModel = model.contentRelationship({ seed: t.title });
	if (customModel.config) {
		customModel.config.customtypes = ["foo"];
		customModel.config.tags = ["bar"];
	}

	t.throws(
		() =>
			value.contentRelationship({
				seed: t.title,
				model: customModel,
				linkableDocuments,
			}),
		{ message: /could not be found/ },
	);
});

test("can be configured to return a value with display text", (t) => {
	const linkableDocuments = [
		value.document({ seed: t.title }),
		value.document({ seed: t.title }),
	];

	const actualTrue = value.contentRelationship({
		seed: t.title,
		linkableDocuments,
		withText: true,
	});
	t.is(actualTrue.text, "Neque laoreet");

	const actualFalse = value.contentRelationship({
		seed: t.title,
		linkableDocuments,
		withText: false,
	});
	t.is(actualFalse.text, undefined);
});
