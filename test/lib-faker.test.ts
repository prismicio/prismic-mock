import { it, expect } from "vitest"

import { createFaker } from "../src/lib/createFaker"

it("random", ({ task }) => {
	const faker = createFaker(task.name)

	expect(faker.random()).toBe(0.2936111260889124)
	expect(faker.random()).toBe(0.03282859386709253)
})

it("randomElement", ({ task }) => {
	const faker = createFaker(task.name)

	expect(faker.randomElement([1, 2, 3])).toBe(1)
	expect(faker.randomElement([] as undefined[])).toBe(undefined)
})

it("range", ({ task }) => {
	const faker = createFaker(task.name)

	expect(faker.range(0, 100)).toBe(44)
	expect(faker.range(10, 20)).toBe(19)
})

it("rangeFloat", ({ task }) => {
	const faker = createFaker(task.name)

	expect(faker.rangeFloat(0, 100)).toBe(32.577370417438765)
	expect(faker.rangeFloat(10, 20)).toBe(11.09656356999105)
})

it("lorem", ({ task }) => {
	const faker = createFaker(task.name)

	expect(faker.lorem("10w")).toBe(
		"vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur",
	)
	expect(faker.lorem("10w", 0)).toBe(
		"lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam",
	)
	expect(faker.lorem("10w", 1)).toBe(
		"ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus",
	)
	expect(faker.lorem("20000w").split(" ").length).toBe(20000)
	expect(faker.lorem("10c")).toBe("lorem ipsu")
})

it("word", ({ task }) => {
	const faker = createFaker(task.name)

	expect(faker.word()).toBe("porttitor")
	expect(faker.word()).toBe("ut")
})
