import test from "ava";

import * as value from "../src/value";

test("document is an alias for custom type", (t) => {
	t.is(value.document, value.customType);
});
