import test from "ava";

import { createMockFactory, MockFactory } from "../src";

test("creates a mock instance", (t) => {
	const mock = createMockFactory();

	t.true(mock instanceof MockFactory);
});
