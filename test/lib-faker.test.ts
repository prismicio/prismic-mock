import test from "ava";

import { createFaker } from "../src/lib/createFaker";

test("random", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.random(), 0.2936111260889124);
	t.is(faker.random(), 0.03282859386709253);
});

test("randomElement", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.randomElement([1, 2, 3]), 1);
	t.is(faker.randomElement([] as undefined[]), undefined);
});

test("range", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.range(0, 100), 44);
	t.is(faker.range(10, 20), 19);
});

test("rangeFloat", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.rangeFloat(0, 100), 32.577370417438765);
	t.is(faker.rangeFloat(10, 20), 11.09656356999105);
});

test("lorem", (t) => {
	const faker = createFaker(t.title);

	t.is(
		faker.lorem("10w"),
		"orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero",
	);
	t.is(
		faker.lorem("10w", 0),
		"lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
	);
	t.is(
		faker.lorem("10w", 1),
		"ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus",
	);
	t.is(faker.lorem("20000w").split(" ").length, 20000);
	t.is(faker.lorem("10c"), "lorem ipsu");
});

test("word", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.word(), "amet,");
	t.is(faker.word(), "diam");
});
