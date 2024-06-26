import test from "ava";
import * as prismic from "@prismicio/client";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test(
	"creates a mock Shared Slice variation field model",
	snapshotTwiceMacro,
	(t) => prismicM.model.sharedSliceVariation({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	prismicM.model.sharedSliceVariation({ seed: 1 }),
);

test("can be configured with a specific id", (t) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: t.title,
		id: "custom_id",
	});

	t.is(actual.id, "custom_id");
	t.is(actual.name, "CustomId");
});

test("can be configured with a specific name", (t) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: t.title,
		name: "Custom Name",
	});

	t.is(actual.id, "custom_name");
	t.is(actual.name, "Custom Name");
});

test("can be configured with a specific id and name", (t) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: t.title,
		id: "custom_id",
		name: "Custom Name",
	});

	t.is(actual.id, "custom_id");
	t.is(actual.name, "Custom Name");
});

test("can be configured for specific primary and items fields", (t) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: t.title,
		primaryFields: {
			boolean: prismicM.model.boolean({ seed: t.title }),
			group: prismicM.model.group({
				seed: t.title,
				fields: {
					boolean: prismicM.model.boolean({ seed: t.title }),
				},
			}),
		},
		itemsFields: {
			keyText: prismicM.model.keyText({ seed: t.title }),
		},
	});

	t.is(actual.primary?.boolean.type, prismic.CustomTypeModelFieldType.Boolean);
	t.is(actual.primary?.group.type, prismic.CustomTypeModelFieldType.Group);
	t.is(
		actual.primary?.group.config?.fields?.boolean.type,
		prismic.CustomTypeModelFieldType.Boolean,
	);
	t.is(actual.items?.keyText.type, prismic.CustomTypeModelFieldType.Text);
});
