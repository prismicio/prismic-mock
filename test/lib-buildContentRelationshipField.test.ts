import test from "ava";

import { value, model } from "../src";
import { buildContentRelationshipField } from "../src/lib/buildContentRelationshipField";

test("returns undefined uid if document.uid is null", (t) => {
	const document = value.document({
		seed: t.title,
		model: model.customType({ seed: t.title }),
	});

	const actual = buildContentRelationshipField({ document });

	t.is(document.uid, null);
	t.is(actual.uid, undefined);
});

test("returns undefined url if document.url is null", (t) => {
	const document = value.document({ seed: t.title });
	document.url = null;

	const actual = buildContentRelationshipField({ document });

	t.is(actual.url, undefined);
});
