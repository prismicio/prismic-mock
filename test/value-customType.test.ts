import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates a mock CustomType field value", snapshotTwiceMacro, () =>
	prismicM.value.customType(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	prismicM.value.customType({ seed: t.title }),
);

test("supports custom model", (t) => {
	const customModel = prismicM.model.customType({
		seed: t.title,
		fields: {
			uid: prismicM.model.uid({ seed: t.title }),
			boolean: prismicM.model.boolean({ seed: t.title }),
		},
	});

	const actual = prismicM.value.customType({
		seed: t.title,
		model: customModel,
	});

	t.is(typeof actual.uid, "string");
	t.is(typeof actual.data.boolean, "boolean");
});

test("uid field is not included in data field", (t) => {
	const customModel = prismicM.model.customType({
		seed: t.title,
		fields: {
			uid: prismicM.model.uid({ seed: t.title }),
		},
	});

	const actual = prismicM.value.customType({
		seed: t.title,
		model: customModel,
	});

	t.is(typeof actual.uid, "string");
	t.false("uid" in actual.data);
});

test("uid field is null if not UID field is not in model", (t) => {
	const customModel = prismicM.model.customType({
		seed: t.title,
		fields: {
			boolean: prismicM.model.boolean({ seed: t.title }),
		},
	});

	const actual = prismicM.value.customType({
		seed: t.title,
		model: customModel,
	});

	t.is(actual.uid, null);
	t.false("uid" in actual.data);
});

test("can be configured to return value with alternative languages", (t) => {
	const customModel = prismicM.model.customType({ seed: t.title });

	const alternateLanguages = [
		prismicM.value.customType({
			seed: t.title,
			model: customModel,
		}),
		prismicM.value.customType({
			seed: t.title,
			model: customModel,
		}),
	];

	const actual = prismicM.value.customType({
		model: customModel,
		alternateLanguages,
	});

	t.deepEqual(
		actual.alternate_languages.map((item) => item.id),
		alternateLanguages.map((alternateLanguage) => alternateLanguage.id),
	);
});

test("can be configured to explicitly return value with a URL", (t) => {
	const actualTrue = prismicM.value.customType({
		seed: t.title,
		withURL: true,
	});
	t.is(typeof actualTrue.url, "string");

	const actualFalse = prismicM.value.customType({
		seed: t.title,
		withURL: false,
	});
	t.is(actualFalse.url, null);
});
