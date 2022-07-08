import test from "ava";

import { createFaker } from "../src/lib/createFaker";

test("random", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.random(), 0.5526393386535347);
	t.is(faker.random(), 0.41176102636381984);
});

test("randomElement", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.randomElement([1, 2, 3]), 3);
	t.is(faker.randomElement([] as undefined[]), undefined);
});

test("range", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.range(0, 100), 27);
	t.is(faker.range(10, 20), 17);
});

test("rangeFloat", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.rangeFloat(0, 100), 39.08171590883285);
	t.is(faker.rangeFloat(10, 20), 16.042331447824836);
});

test("lorem", (t) => {
	const faker = createFaker(t.title);

	t.is(
		faker.lorem("10w"),
		"ut tellus elementum sagittis vitae et leo duis ut diam",
	);
	t.is(
		faker.lorem("10w", 0),
		"lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
	);
	t.is(
		faker.lorem("10w", 1),
		"ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus",
	);
	t.is(faker.lorem("200000w").split(" ").length, 200000);
	t.is(faker.lorem("10c"), "lorem ipsu");
});

test("word", (t) => {
	const faker = createFaker(t.title);

	t.is(faker.word(), "lacus");
	t.is(faker.word(), "vestibulum");
});
