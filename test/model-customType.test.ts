import test from "ava";
import * as prismic from "@prismicio/client";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates a mock Custom Type field model", snapshotTwiceMacro, (t) =>
	prismicM.model.customType({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	prismicM.model.customType({ seed: 1 }),
);

test("can be configured for specific fields", (t) => {
	const actual = prismicM.model.customType({
		seed: t.title,
		fields: {
			boolean: prismicM.model.boolean({ seed: t.title }),
		},
	});

	t.is(actual.json.Main.boolean.type, prismic.CustomTypeModelFieldType.Boolean);
});

test("can be configured for specific tabs", (t) => {
	const actual = prismicM.model.customType({
		seed: t.title,
		tabs: {
			Main: {
				boolean: prismicM.model.boolean({ seed: t.title }),
			},
		},
	});

	t.is(actual.json.Main.boolean.type, prismic.CustomTypeModelFieldType.Boolean);
});
