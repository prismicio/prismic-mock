import test from "ava";
import * as prismic from "@prismicio/client";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Group field model", snapshotTwiceMacro, (t) =>
	model.group({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.group({ seed: 1 }),
);

test("can be configured for specific fields", (t) => {
	const actual = model.group({
		seed: t.title,
		fields: {
			boolean: model.boolean({ seed: t.title }),
		},
	});

	t.is(
		actual.config?.fields?.boolean.type,
		prismic.CustomTypeModelFieldType.Boolean,
	);
});
