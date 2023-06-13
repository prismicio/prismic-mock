import test from "ava";
import * as prismic from "@prismicio/client";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates a mock Slice field model", snapshotTwiceMacro, (t) =>
	prismicM.model.slice({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	prismicM.model.slice({ seed: 1 }),
);

test("can be configured for specific non-repeat and repeat fields", (t) => {
	const actual = prismicM.model.slice({
		seed: t.title,
		nonRepeatFields: {
			boolean: prismicM.model.boolean({ seed: t.title }),
		},
		repeatFields: {
			keyText: prismicM.model.keyText({ seed: t.title }),
		},
	});

	t.is(
		actual["non-repeat"]?.boolean.type,
		prismic.CustomTypeModelFieldType.Boolean,
	);
	t.is(actual.repeat?.keyText.type, prismic.CustomTypeModelFieldType.Text);
});
