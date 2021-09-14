import test from "ava";
import * as prismicT from "@prismicio/types";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock CustomType field value",
	snapshotTwiceMacro,
	value.customType,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.customType({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.customType({
		withUID: true,
		tabsCount: 1,
		withSliceZones: true,
		withSharedSlices: true,
	});

	const actual = value.customType({ model: customModel });

	t.is(typeof actual.uid, "string");
});

test("supports custom field configs", (t) => {
	const linkableDocuments = [value.document()];
	const customModel = model.customType({
		tabsCount: 1,
		configs: {
			boolean: { count: 0 },
			color: { count: 0 },
			contentRelationship: { count: 1 },
			date: { count: 0 },
			embed: { count: 0 },
			geoPoint: { count: 0 },
			image: { count: 0 },
			integrationFields: { count: 0 },
			keyText: { count: 0 },
			link: { count: 0 },
			linkToMedia: { count: 0 },
			number: { count: 0 },
			richText: { count: 0 },
			select: { count: 0 },
			timestamp: { count: 0 },
			title: { count: 0 },
		},
	});

	const actual = value.customType({
		model: customModel,
		configs: {
			contentRelationship: {
				linkableDocuments,
			},
		},
	});

	const fieldKey = Object.keys(actual.data)[0];

	// @ts-expect-error - Untyped data field
	t.is(actual.data?.[fieldKey]?.id, linkableDocuments[0].id);
});

test("uid field is not included in data field", (t) => {
	const customModel = model.customType({ withUID: true });
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const uidFieldName = Object.values(customModel.json)
		.flatMap((tab) => Object.entries(tab))
		.find(
			([_, fieldModel]) =>
				fieldModel.type === prismicT.CustomTypeModelFieldType.UID,
		)![0];

	const actual = value.customType({ model: customModel });

	t.is(typeof actual.uid, "string");
	t.false(uidFieldName in actual.data);
});

test("can be configured to return value with alternative languages", (t) => {
	const customModel = model.customType();
	const alternateLanguages = [
		value.customType({ model: customModel }),
		value.customType({ model: customModel }),
	];

	const actual = value.customType({
		model: customModel,
		alternateLanguages,
	});

	t.deepEqual(
		actual.alternate_languages.map((item) => item.id),
		alternateLanguages.map((alternateLanguage) => alternateLanguage.id),
	);
});
